import { ParsedEvent } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Acudiente } from 'src/app/common/modelos/Acudiente';
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { Grupo } from 'src/app/common/modelos/grupo';
import { AcudienteService } from 'src/app/services/Coordinador/acudiente.service';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-editar-estudiante',
  templateUrl: './editar-estudiante.component.html',
  styleUrls: ['./editar-estudiante.component.scss']
})
export class EditarEstudianteComponent implements OnInit {

  @Input() estudiante: Estudiante;
  @Input() grupos;

  regularForm: any;
  editAcudiente: boolean;
  addAcudiente: boolean;
  actualizarAcudiente: boolean;

  constructor(public activeModal: NgbActiveModal,
    private estudianteService: EstudianteService,
    private acudienteService: AcudienteService) {
    this.editAcudiente = true;
    this.addAcudiente = false;
    this.actualizarAcudiente = false;
  }

  ngOnInit(): void {
    this.estudiante.nacimiento = new Date(this.estudiante.nacimiento);
    this.regularForm = new FormGroup({
      'nombreAcudiente': new FormControl(),
      'apellidoAcudiente': new FormControl(),
      'telefono': new FormControl(),
      'telefonoAlterno': new FormControl(),
      'direccion': new FormControl(),
      'estrato': new FormControl(),
      'barrio': new FormControl(),
    }, { updateOn: 'change' })
    this.regularForm.controls.nombreAcudiente.disable()
    this.regularForm.controls.nombreAcudiente.disable()
    this.regularForm.controls.apellidoAcudiente.disable()
    this.regularForm.controls.telefonoAlterno.disable()
    this.regularForm.controls.telefono.disable()
    this.regularForm.controls.direccion.disable()
    this.regularForm.controls.estrato.disable()
    this.regularForm.controls.barrio.disable()
  }

  close() {
    this.activeModal.close('Close Click');
  }
  consultarAcudiente() {
    this.acudienteService.buscarCedula(this.estudiante.acudiente.cedula).subscribe(res => {
      if (!res.mensaje) {
        this.regularForm.controls.nombreAcudiente.enable();
        this.regularForm.controls.nombreAcudiente.enable();
        this.regularForm.controls.apellidoAcudiente.enable();
        this.regularForm.controls.telefonoAlterno.enable()
        this.regularForm.controls.telefono.enable();
        this.regularForm.controls.direccion.enable();
        this.regularForm.controls.estrato.enable()
        this.regularForm.controls.barrio.enable()
        swal.fire('No existe', `Se habilitará la opcion crear Acudiente`, 'warning')
        this.addAcudiente = true
        this.editAcudiente = false;
        this.actualizarAcudiente = false;
      }
      else {
        this.regularForm.controls.nombreAcudiente.disable()
        this.regularForm.controls.nombreAcudiente.disable()
        this.regularForm.controls.apellidoAcudiente.disable()
        this.regularForm.controls.telefono.disable()
        this.regularForm.controls.direccion.disable()
        this.regularForm.controls.telefonoAlterno.disable()
        this.regularForm.controls.estrato.disable()
        this.regularForm.controls.barrio.disable()
        this.estudiante.acudiente = res.acudiente;
        this.addAcudiente = false;
        this.editAcudiente = true;
        this.actualizarAcudiente = false;
        this.estudiante.acudiente.id = res.acudiente.id;
      }

    })
  }

  actualizarEstudiante() {
    this.estudianteService.actualizar(this.estudiante).subscribe(res => {
      swal.fire('Estudiante Actualizado', `Estudiante: ${this.estudiante.nombre} ${this.estudiante.apellido} actualizado con éxito!`, 'success')
      this.close();
    },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        console.log(err)
        let error = err.error as string;
        swal.fire(err.error.mensaje, err.error.error, 'error');
      })
  }

  agregarAcudiente() {
    this.acudienteService.create(this.estudiante.acudiente).subscribe(
      res => {
        swal.fire('Nuevo Acudiente', `Acudiente: ${this.estudiante.acudiente.nombre} ${this.estudiante.acudiente.apellido} creado con éxito!`, 'success')
        this.estudiante.acudiente.id = res.padre.id
      },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        console.log(err)
        let error = err.error as string;
        swal.fire(err.error.mensaje, err.error.error, 'error');
      }
    );
  }

  set humanDate(e) {
    e = e.split('-');
    let d = new Date(Date.UTC(e[0], e[1] - 1, e[2]));
    this.estudiante.nacimiento.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
  }

  get humanDate() {
    return this.estudiante.nacimiento.toISOString().substring(0, 10);
  }


  habilitarAcudiente() {
    this.regularForm.controls.nombreAcudiente.enable();
    this.regularForm.controls.nombreAcudiente.enable();
    this.regularForm.controls.apellidoAcudiente.enable();
    this.regularForm.controls.telefonoAlterno.enable()
    this.regularForm.controls.telefono.enable();
    this.regularForm.controls.direccion.enable();
    this.regularForm.controls.estrato.enable()
    this.regularForm.controls.barrio.enable()
    this.editAcudiente = false;
    this.actualizarAcudiente = true;
  }

  editarAcudiente() {
    this.acudienteService.actualizar(this.estudiante.acudiente).subscribe(res => {
      swal.fire('Acudiente Actualizado', `Acudiente: ${this.estudiante.acudiente.nombre} ${this.estudiante.acudiente.apellido} actualizado con éxito!`, 'success')
      this.regularForm.controls.nombreAcudiente.disable()
      this.regularForm.controls.nombreAcudiente.disable()
      this.regularForm.controls.apellidoAcudiente.disable()
      this.regularForm.controls.telefono.disable()
      this.regularForm.controls.direccion.disable()
      this.regularForm.controls.telefonoAlterno.disable()
      this.regularForm.controls.estrato.disable()
      this.regularForm.controls.barrio.disable()
      this.addAcudiente = false;
      this.editAcudiente = true;
      this.actualizarAcudiente = false;
    },
      err => {
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        console.log(err)
        let error = err.error as string;
        swal.fire(err.error.mensaje, err.error.error, 'error');
      })
  }

}
