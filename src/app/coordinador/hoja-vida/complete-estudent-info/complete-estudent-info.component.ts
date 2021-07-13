import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { AcudienteService } from 'src/app/services/Coordinador/acudiente.service';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-complete-estudent-info',
  templateUrl: './complete-estudent-info.component.html',
  styleUrls: ['./complete-estudent-info.component.scss']
})
export class CompleteEstudentInfoComponent implements OnInit {

  regularForm: FormGroup;
  @Input() estudiante: Estudiante;

  constructor(
    public activeModal: NgbActiveModal,
    private estudianteService: EstudianteService,
    private acudienteService: AcudienteService
  ) { }

  ngOnInit(): void {
    console.log(this.estudiante)
    this.regularForm = new FormGroup({
      'eps': new FormControl(null, [Validators.required]),
      'barrio': new FormControl(null, [Validators.required]),
      'estrato': new FormControl(null, [Validators.required]),
      'desplazado': new FormControl(null, [Validators.required]),
    }, { updateOn: 'change' });
    this.regularForm.controls['eps'].setValue(this.estudiante.eps);
    this.regularForm.controls['barrio'].setValue(this.estudiante.acudiente.barrio);
    this.regularForm.controls['estrato'].setValue(this.estudiante.acudiente.estrato);
    this.regularForm.controls['desplazado'].setValue(this.estudiante.desplazado)
  }
  complete() {
    this.actualizarEstudiante();

  }

  close() {
    this.activeModal.close('Close Click');
  }

  actualizarEstudiante() {
    this.estudiante.nacimiento = new Date(this.estudiante.nacimiento);
    this.estudiante.eps = this.regularForm.controls['eps'].value;
    this.estudiante.acudiente.barrio = this.regularForm.controls['barrio'].value;
    this.estudiante.acudiente.estrato = this.regularForm.controls['estrato'].value;
    this.estudiante.desplazado = this.regularForm.controls['desplazado'].value;
 
    this.acudienteService.actualizar(this.estudiante.acudiente).subscribe(res=>{
      this.estudianteService.actualizar(this.estudiante).subscribe(res2 => {
        console.log(res2);
        res2['result'] = true;
        this.activeModal.close(res2);
      },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
          console.log(err)
          let error = err.error as string;
          swal.fire(err.error.mensaje, err.error.error, 'error');
        })
    });
   
  }


}
