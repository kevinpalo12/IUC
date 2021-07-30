import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { element } from 'protractor';
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { Grupo } from 'src/app/common/modelos/grupo';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
import { GrupoService } from 'src/app/services/Coordinador/grupo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tomar-asistencia',
  templateUrl: './tomar-asistencia.component.html',
  styleUrls: ['./tomar-asistencia.component.scss']
})
export class TomarAsistenciaComponent implements OnInit {

  estudiantes: any[]
  inasistentes: any[]
  paginador
  grupos: any[]
  grupo

  constructor(
    private estudianteService: EstudianteService,
    private grupoService: GrupoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listarGrupos();
    this.inasistentes = []
  }


  filtrarGrupo(grup) {
    let gru = grup.value
    this.grupo = this.grupos.filter(gr => gr.id == gru)[0]
    this.estudianteService.porGrupoNoPage(gru)
      .subscribe(response => {
        this.estudiantes = response as Estudiante[]
      });
  }

  filtrar(nombre, apellido, identificacion) {
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

    this.estudianteService.getEstudiantesFiltro(nom, ape, id, 0)
      .subscribe(response => {
        this.estudiantes = response.content as Estudiante[]
        this.paginador = response;
        console.log(this.estudiantes)
      });
  }

  listarGrupos() {
    this.grupoService.listarGrupos().subscribe(res => {
      this.grupos = res;
    })
  }

  agregarAListaInasistentes(estudiante) {
    this.inasistentes.push(estudiante)
    let index = this.estudiantes.indexOf(estudiante)
    if (index > -1) {
      this.estudiantes.splice(index, 1);
    }
  }

  quitarInasistencia(estudiante) {
    this.estudiantes.push(estudiante)
    let index = this.inasistentes.indexOf(estudiante)
    if (index > -1) {
      this.inasistentes.splice(index, 1);
    }
  }

  agregarExcusa(archivo) {
    let file = (<HTMLInputElement>document.getElementById(archivo.id + '_file')).files[0]
    let inasistencia = {
      estudiante: {
        id: archivo.id
      }
    }
    this.estudianteService.agregarInasistencia(inasistencia).subscribe(res => {
      if (file) {
        // this.estudianteService.agregarExcusa(file, res.Inasistencia.id).subscribe(respuesta => {
        //   console.log(respuesta)
        // })
      }

    })
  }

  guardarInasistencia(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success p-3 m-3',
        cancelButton: 'btn btn-danger p-3 m-3'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Está seguro?',
      text: `Las inasistencias se crearan para los estudiantes seleccionados`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.inasistentes.forEach(element=>{
          this.agregarExcusa(element);
        })
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
          title: 'Las inacistencias se guardaron de forma permanente '
        })
        this.router.navigate(['profesor/inicio']);
      }
    })

  }
}
