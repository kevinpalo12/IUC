import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { RegistroPsicologicoService } from 'src/app/Services/Coordinador/registro-psicologico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-registro-psicologico',
  templateUrl: './crear-registro-psicologico.component.html',
  styleUrls: ['./crear-registro-psicologico.component.scss']
})
export class CrearRegistroPsicologicoComponent implements OnInit {

  regularForm: FormGroup;
  @Input() estudiante: number;

  constructor(
    public activeModal: NgbActiveModal,
    private registroService: RegistroPsicologicoService
  ) { }

  ngOnInit(): void {
    this.regularForm = new FormGroup({
      'anotacion': new FormControl(null, [Validators.required]),
      'diagnostico': new FormControl()
    }, { updateOn: 'change' })
  }

  close() {
    this.activeModal.close('Close Click');
  }

  agregarRegistro() {
    let registro = this.regularForm.value;
    registro.createAt = new Date();
    registro.estudiante = {
      id: this.estudiante
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
      html: `<b>Se creara la visita psicologica para el estudiante: </b><br> ${registro.anotacion}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, agregar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.registroService.create(registro).subscribe(
          res => {
            res['result'] = true;
            this.activeModal.close(res);
          }
        )
      }
    })
  }
}
