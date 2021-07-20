import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfesorService } from 'src/app/Services/Coordinador/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-profesor',
  templateUrl: './crear-profesor.component.html',
  styleUrls: ['./crear-profesor.component.scss']
})
export class CrearProfesorComponent implements OnInit {

  regularForm: FormGroup;
  constructor(public activeModal: NgbActiveModal,
    private profesorService: ProfesorService) { }

  ngOnInit(): void {
    this.regularForm = new FormGroup({
      'nombre': new FormControl(),
      'correo': new FormControl(null, [Validators.required]),
      'telefono': new FormControl()
    }, { updateOn: 'change' })
  }

  close() {
    this.activeModal.close('Close Click');
  }

  crearProfesor() {
    let registro = this.regularForm.value;
    registro['clave'] = this.makeid(8)
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `El profesor ${registro.nombre} será creado`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, crear',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.profesorService.createProfesor(registro).subscribe(res => {
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
            title: 'Profesor Creado con exito, la contraseña se enviara al correo'
          })
        });

      } else {
        this.close();
      }
    })




  }

  private makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }
}
