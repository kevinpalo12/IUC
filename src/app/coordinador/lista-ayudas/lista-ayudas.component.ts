import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyudaService } from 'src/app/services/Coordinador/ayuda.service';
import { GrupoService } from 'src/app/services/Coordinador/grupo.service';
import { CrearAyudaComponent } from './crear-ayuda/crear-ayuda.component';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
@Component({
  selector: 'app-lista-ayudas',
  templateUrl: './lista-ayudas.component.html',
  styleUrls: ['./lista-ayudas.component.scss']
})
export class ListaAyudasComponent implements OnInit {
  ayudas
  paginador: any;
  grupos: any[];
  ayudasCompletas: any[];
  regularForm: FormGroup;
  formFiltro: FormGroup
  filtro
  estudiantes

  constructor(
    private grupoService: GrupoService,
    private ayudaService: AyudaService,
    private estudianteService: EstudianteService,
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listarGrupos();
    this.listarAyudasCantidad();
    this.listarAyudas();

    this.regularForm = new FormGroup({
      'descripcion': new FormControl(null, [Validators.required]),
      'fechaEntrega': new FormControl(null, [Validators.required])
    }, { updateOn: 'change' })

    this.formFiltro = new FormGroup({
      'descripcion': new FormControl()
    }, { updateOn: 'change' })

    this.filtrar();
  }

  filtrar() {
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page') || 0;
      if (!page) {
        page = 0;
      }
      let filtro = this.formFiltro.value;
      filtro = {
        'descripcion': filtro.descripcion || '@@'
      }
      this.ayudaService.listaEstudiante(filtro.descripcion, page).subscribe(res => {
        this.estudiantes = res.lista.content;
        this.paginador = res.lista;
      })
    })
  }

  quitarEstudiante(estudiante){
    console.log(estudiante)
  }
  programarEntrega() {
    let entrega = this.regularForm.value;

    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      html: `Crear Entrega para la ayuda <b>${entrega.descripcion}</b> en la fecha <b>${entrega.descripcion}</b>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Crear',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.ayudaService.crear(entrega).subscribe(res => {
          swal.fire(`Entrega para la ayuda: ${res.ayuda.descripcion} creada con éxito!`, `Proxima entrega ${new Date(res.ayuda.fechaEntrega).toLocaleDateString()}`, 'success');
        })
      }
    })

  }

  listarGrupos() {
    this.grupoService.listarGrupos().subscribe(res => {
      this.grupos = res;
    })
  }

  listarAyudasCantidad() {
    this.ayudaService.getAyudasCantidad().subscribe(res => {
      this.ayudas = res;
    })
  }

  crearAyuda() {
    const modalRef = this.modalService.open(CrearAyudaComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.data = {
      grupos: this.grupos
    }
    modalRef.result.then((data) => {
      this.listarAyudasCantidad();
      this.listarAyudas();
    })
  }

  listarAyudas() {
    this.ayudaService.getAyudas().subscribe(res => {
      this.ayudasCompletas = res;
    })
  }

  agregarAyudaEstudiante(){
  }
}
