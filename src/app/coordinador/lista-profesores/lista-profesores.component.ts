import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profesor } from 'src/app/common/modelos/profesor';
import { ProfesorService } from 'src/app/Services/Coordinador/profesor.service';
import { CrearProfesorComponent } from './crear-profesor/crear-profesor.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.scss']
})
export class ListaProfesoresComponent implements OnInit {

  profesores
  paginador
  constructor(
    private modalService: NgbModal,
    private activateRoute: ActivatedRoute,
    private profesorService: ProfesorService
  ) { }

  ngOnInit(): void {
    this.listarProfesores();
  }

  crearProfesor() {
    const modalRef = this.modalService.open(CrearProfesorComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.data = {
    }
    modalRef.result.then((data) => {
      this.listarProfesores();
    })
  }

  listarProfesores() {
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page') || 0;
      if (!page) {
        page = 0;
      }
      this.profesorService.getProfesores(page)
        .subscribe(response => {
          this.profesores = response.content as Profesor[]
          this.paginador = response;
        });
    })
  }
  editarProfesor(profesor) {

  }

  delete(profesor) {
    console.log(profesor)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `El profesor ${profesor.nombre} será eliminado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.delete(profesor.id).subscribe(res => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: 'success',
            title: 'Profesor eliminado con exito'
          })
          this.listarProfesores();
        });
        
      }
    })
  }
}
