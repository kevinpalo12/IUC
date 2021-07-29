import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
import Swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrearEstudianteComponent } from './crear-estudiante/crear-estudiante.component';
import { Grupo } from 'src/app/common/modelos/grupo';
import { GrupoService } from 'src/app/services/Coordinador/grupo.service';
import { EditarEstudianteComponent } from './editar-estudiante/editar-estudiante.component';
@Component({
  selector: 'app-lista-estudiantes',
  templateUrl: './lista-estudiantes.component.html',
  styleUrls: ['./lista-estudiantes.component.scss']
})
export class ListaEstudiantesComponent implements OnInit {
  estudiantes: Estudiante[];
  paginador: any;
  grupos: Grupo[];
  estudiante: Estudiante;

  constructor(
    private activateRoute: ActivatedRoute,
    private estudianteService: EstudianteService,
    private grupoService: GrupoService,
    private modalService: NgbModal,
    private router: Router) {
    this.estudiantes = []
    this.grupos = []
  }

  ngOnInit() {
    this.listarGrupos();
    this.listarEstudiantes();

  }

  listarEstudiantes() {
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page') || 0;

      if (!page) {
        page = 0;
      }
      this.estudianteService.getEstudiantes(page)
        .subscribe(response => {
          this.estudiantes = response.content as Estudiante[]
          this.paginador = response;


        });
    })
  }
  filtrar(nombre, apellido, identificacion) {
    this.router.navigate(['coordinador/estudiante/page/0']);
    let nom = nombre.value, ape = apellido.value, id = identificacion.value;
    if (nombre.value === '') {
      nom = "-";
    }
    if (apellido.value === '') {
      ape = "-";
    }
    if (identificacion.value === '') {
      id = "-";
    }
    let subscriber = this.activateRoute.paramMap.pipe().subscribe(params => {
      let page: number = +params.get('page') || 0;
      if (!page) {
        page = 0;
      }
      this.estudianteService.getEstudiantesFiltro(nom, ape, id, page).pipe(
        tap(response => {
          (response.content as Estudiante[]).forEach(estudiante => {
            console.log(estudiante.nombre);
          });
        }))
        .subscribe(response => {
          this.estudiantes = response.content as Estudiante[]
          this.paginador = response;
          subscriber.unsubscribe();
        });
    })

  }

  filtrarGrupo(grupo) {
    let gru = grupo.value;
    let subscriber = this.activateRoute.paramMap.pipe().subscribe(params => {
      let page: number = +params.get('page') || 0;
      if (!page) {
        page = 0;
      }
      this.estudianteService.porGrupo(gru, page).pipe(
        tap(response => {
          (response.content as Estudiante[]).forEach(estudiante => {
            console.log(estudiante.nombre);
          });
        }))
        .subscribe(response => {
          this.estudiantes = response.content as Estudiante[]
          this.paginador = response;
          subscriber.unsubscribe();
        });
    })
  }
  crearEstudiante() {
    const modalRef = this.modalService.open(CrearEstudianteComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.data = {
      grupos: this.grupos
    }
    modalRef.result.then((data) => {
      this.listarEstudiantes();
    })
  }

  editarEstudiante(estudiante) {
    const modalRef = this.modalService.open(EditarEstudianteComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.estudiante = estudiante;
    modalRef.componentInstance.grupos = this.grupos;

    modalRef.result.then((data) => {
      this.listarEstudiantes();
    })
  }

  listarGrupos() {
    this.grupoService.listarGrupos().subscribe(res => {
      this.grupos = res;
    })
  }
  delete(estudiante: Estudiante): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `El estudiante ${estudiante.nombre} ${estudiante.apellido} será eliminado permanentemente`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.estudianteService.delete(estudiante.id).subscribe(
          response => {
            this.estudiantes = this.estudiantes.filter(estu => estu !== estudiante)
            this.listarEstudiantes();
            swalWithBootstrapButtons.fire(
              'Eliminar!',
              `${estudiante.nombre} ${estudiante.apellido} eliminado !`,
              'success'
            )

          }
        )

      }
    })
  }


  irHojaVida(id) {
    this.router.navigate(['coordinador/estudiante/' + id]);
  }
}
