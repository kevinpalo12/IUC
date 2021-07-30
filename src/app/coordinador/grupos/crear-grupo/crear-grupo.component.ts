import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GrupoService } from 'src/app/services/Coordinador/grupo.service';
import { ProfesorService } from 'src/app/Services/Coordinador/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-grupo',
  templateUrl: './crear-grupo.component.html',
  styleUrls: ['./crear-grupo.component.scss']
})
export class CrearGrupoComponent implements OnInit {

  regularForm: FormGroup
  profesores
  constructor(
    private profesorService: ProfesorService,
    private grupoService: GrupoService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.profesoresSinGrupo();
    this.regularForm = new FormGroup({
      'profesor': new FormControl(null, [Validators.required]),
      'grado': new FormControl(null, [Validators.required]),
      'identificador': new FormControl(null, [Validators.required])
    }, { updateOn: 'change' })
  }

  profesoresSinGrupo() {
    this.profesorService.profesoresSinGrupo().subscribe(res => {
      this.profesores = res.respuesta
    })
  }

  close() {
    this.activeModal.close('Close Click');
  }

  crearGrupo() {
    let registro = this.regularForm.value;
    let id = registro.profesor
    registro.profesor ={
      id:id
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `El grupo ${registro.grado}-${registro.identificador} será creado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, crear',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.grupoService.create(registro).subscribe(res => {
          this.activeModal.close(res);
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
            title: 'Grupo Creado con exito'
          })
        });

      } else {
        this.close();
      }
    })
  }
}
