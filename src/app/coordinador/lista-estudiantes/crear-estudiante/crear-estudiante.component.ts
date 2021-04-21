import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Acudiente } from 'src/app/common/modelos/Acudiente';
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { Grupo } from 'src/app/common/modelos/grupo';
import { AcudienteService } from 'src/app/services/Coordinador/acudiente.service';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-crear-estudiante',
  templateUrl: './crear-estudiante.component.html',
  styleUrls: ['./crear-estudiante.component.scss']
})
export class CrearEstudianteComponent implements OnInit {
  @Input() data;
  grupos: Grupo[];
  errores: string[];
  editAcudiente: boolean;
  modelo: { estudiante: Estudiante, acudiente: Acudiente }
  regularForm: FormGroup;
  estudiante: Estudiante;

  constructor(
    public activeModal: NgbActiveModal,
    private estudianteService: EstudianteService,
    private acudienteService: AcudienteService,
    private router: Router) {
    this.modelo = {
      estudiante: new Estudiante(),
      acudiente: new Acudiente()

    }
    this.modelo.estudiante.grupo = new Grupo();
    this.modelo.estudiante.acudiente = new Acudiente();

    this.editAcudiente = false;


  }

  ngOnInit(): void {
    this.grupos = this.data.grupos;
    this.regularForm = new FormGroup({
      'nombreAcudiente': new FormControl(),
      'apellidoAcudiente': new FormControl(),
      'telefono': new FormControl(),
      'telefonoAlterno': new FormControl(),
      'direccion': new FormControl(),
    }, { updateOn: 'change' })
    this.regularForm.controls.nombreAcudiente.disable()
    this.regularForm.controls.nombreAcudiente.disable()
    this.regularForm.controls.apellidoAcudiente.disable()
    this.regularForm.controls.telefonoAlterno.disable()
    this.regularForm.controls.telefono.disable()
    this.regularForm.controls.direccion.disable()
  }

  agregarAcudiente() {
    this.acudienteService.create(this.modelo.acudiente).subscribe(
      res => {
        swal.fire(`Acudiente: ${this.modelo.acudiente.nombre} ${this.modelo.acudiente.apellido} creado con éxito!`, `Clave Temporal: ${res.acudiente.clave}`, 'success')
        this.modelo.estudiante.acudiente.id = res.acudiente.id
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
        console.log(err)
        let error = err.error as string;
        swal.fire(err.error.mensaje, err.error.error, 'error');
      }
    );
  }

  agregarEstudiante() {
    if (this.modelo.estudiante.documento === "") {
      swal.fire('Falta Documento', `Por favor diligencia el documento del estudiante`, 'error');
      if (this.modelo.estudiante.acudiente.id === -1) {
        swal.fire('Falta Acudiente', `Por favor diligencia el documento del estudiante y dar click al boton de la lupa`, 'error');
      }
    }
    this.estudianteService.create(this.modelo.estudiante).subscribe(
      response => {
        swal.fire('Nuevo Estudiante', `Estudiante: ${this.modelo.estudiante.nombre} ${this.modelo.estudiante.apellido} creado con éxito!`, 'success')
        this.close();
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  


  close() {
    this.activeModal.close('Close Click');
  }

  consultarAcudiente() {
    this.acudienteService.buscarCedula(this.modelo.acudiente.cedula).subscribe(res => {
      if (!res.mensaje) {
        this.regularForm.controls.nombreAcudiente.enable();
        this.regularForm.controls.nombreAcudiente.enable();
        this.regularForm.controls.apellidoAcudiente.enable();
        this.regularForm.controls.telefonoAlterno.enable()
        this.regularForm.controls.telefono.enable();
        this.regularForm.controls.direccion.enable();
        swal.fire('No existe', `Se habilitará la opcion crear Acudiente`, 'warning')
        this.editAcudiente = true
      }
      else {
        this.regularForm.controls.nombreAcudiente.disable()
        this.regularForm.controls.nombreAcudiente.disable()
        this.regularForm.controls.apellidoAcudiente.disable()
        this.regularForm.controls.telefono.disable()
        this.regularForm.controls.direccion.disable()
        this.regularForm.controls.telefonoAlterno.disable()
        this.modelo.acudiente = res.acudiente;
        this.editAcudiente = false;
        this.modelo.estudiante.acudiente.id = res.acudiente.id;
      }

    })
  }
}
