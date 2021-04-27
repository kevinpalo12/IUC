import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AyudaService } from 'src/app/services/Coordinador/ayuda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-ayuda',
  templateUrl: './crear-ayuda.component.html',
  styleUrls: ['./crear-ayuda.component.scss']
})
export class CrearAyudaComponent implements OnInit {
  regularForm: FormGroup;
  ayuda: any;

  constructor(
    public activeModal: NgbActiveModal,
    private ayudaService:AyudaService,
    ) {
    this.ayuda = {}
  }

  ngOnInit(): void {
    this.regularForm = new FormGroup({
      'descripcion': new FormControl(),
      'activo': new FormControl(),
      'entregadoDesde': new FormControl(),
      'ultimaEntrega': new FormControl(),
    }, { updateOn: 'change' })

    this.regularForm.controls.activo.setValue(true);
  }

  crearAyuda() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Crear Ayuda`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, Crear',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let ayuda = this.regularForm.value;
        this.ayudaService.crear(ayuda).subscribe(res=>{
          Swal.fire(`Ayuda: ${this.ayuda.descripcion} creado con éxito!`,'Redirigiendo', 'success');
          this.close();
        })

      }
    })
  }


  close() {
    this.activeModal.close('Close Click');
  }


}
