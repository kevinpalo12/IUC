import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Estudiante, ultimaInasistencia } from 'src/app/common/modelos/estudiante';
import { Grupo } from 'src/app/common/modelos/grupo';
import { AyudaService } from 'src/app/services/Coordinador/ayuda.service';
import { EstudianteService } from 'src/app/services/Coordinador/estudiante.service';
import { GrupoService } from 'src/app/services/Coordinador/grupo.service';
import Swal from 'sweetalert2';
import { EditarEstudianteComponent } from '../lista-estudiantes/editar-estudiante/editar-estudiante.component';
import { CompleteEstudentInfoComponent } from './complete-estudent-info/complete-estudent-info.component';
import { CrearRegistroPsicologicoComponent } from './crear-registro-psicologico/crear-registro-psicologico.component';
import { PdfInformePsicologicoComponent } from './pdf-informe-psicologico/pdf-informe-psicologico.component';
@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.scss']
})
export class HojaVidaComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  estudiante: Estudiante;
  grupos: Grupo[];
  @ViewChild(PdfInformePsicologicoComponent, { static: false }) generadorPDF: PdfInformePsicologicoComponent;
  resumenAyudas: any[];
  ultimaInasistencia:any = new ultimaInasistencia();;

  constructor(
    private route: ActivatedRoute,
    private estudianteService: EstudianteService,
    private grupoService: GrupoService,
    private ayudaService: AyudaService,
    private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.estudianteService.getEstudiante(this.id).subscribe(
        res => {
          this.estudiante = res;
          this.estudiante.nacimiento = new Date(res.nacimiento).toLocaleDateString()
          this.listarActividades();
          this.ultimaExcusa();
          this.getResumenAyudas();
        })
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ultimaExcusa() {
    this.estudianteService.getUltimaExcusa(this.estudiante.id).subscribe(res => {
      if (res.inasistencia.fecha) {
        res.inasistencia.fecha = new Date(res.inasistencia.fecha).toLocaleDateString("es");
      }
      this.ultimaInasistencia = res.inasistencia;
    })
  }
  mostrarAcudiente() {
    Swal.fire({
      title: `<b>${this.estudiante.acudiente.nombre + ' ' + this.estudiante.acudiente.apellido}</b>`,
      html:
        `<style type="text/css">
        p { margin-top: 0%; margin-bottom: 0%;}</style>`+
        `<hr><p><b>Parentesco: </b>${this.estudiante.parentesco}</p> ` +
        `<p><b>Teléfono: </b>${this.estudiante.acudiente.telefono}</p> ` +
        `<p><b>Teléfono alterno: </b>${this.estudiante.acudiente.telefonoAlterno}</p> ` +
        `<p><b>Dirección: </b>${this.estudiante.acudiente.direccion}</p> ` +
        `<p><b>Barrio: </b>${this.estudiante.acudiente.barrio}</p> `,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      cancelButtonText:
        '<i class="fas fa-times"></i> Cerrar',
      cancelButtonColor: '#FF4343'
    })
  }

  crearRegistro() {
    const modalRef = this.modalService.open(CrearRegistroPsicologicoComponent, { size: 'lg', scrollable: true });
    modalRef.componentInstance.estudiante = this.estudiante.id;
    modalRef.result.then((data) => {
      if (data.result) {
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
          title: 'Registro creado con el id: ' + data.registro.id
        })
      }

    })
  }

  descargarInformeRegistroPsicologico() {

    if (!this.estudiante.eps) {
      const modalRef = this.modalService.open(CompleteEstudentInfoComponent, { size: 'lg', scrollable: true });
      modalRef.componentInstance.estudiante = this.estudiante;
      modalRef.result.then((data) => {
        if (data.result) {
          this.descargarPdf();
        }
      })
    }
    else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success p-3',
          cancelButton: 'btn btn-warning p-3 m-3'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Desea actualizar la informacion del estudiante antes de descargar?',
        text: ``,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, cambiar o corroborar información',
        cancelButtonText: 'No, Continuar con la descarga!',
        reverseButtons: true
      }).then((result) => {
        if (!result.isConfirmed) {
          this.descargarPdf();
        }
        else {
          const modalRef = this.modalService.open(CompleteEstudentInfoComponent, { size: 'lg', scrollable: true });
          modalRef.componentInstance.estudiante = this.estudiante;
          modalRef.result.then((data) => {
            if (data.result) {
              this.descargarPdf();
            }
          })
        }
      })
    }

  }
  descargarPdf() {
    this.generadorPDF.downloadPdfPsicologico(this.estudiante);
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
      title: 'La descarga comenzara en breve: '
    })
  }

  editarEstudiante(estudiante) {
    this.listarGrupos(estudiante);

  }

  listarGrupos(estudiante) {
    this.grupoService.listarGrupos().subscribe(res => {
      this.grupos = res;
      const modalRef = this.modalService.open(EditarEstudianteComponent, { size: 'lg', scrollable: true });
      modalRef.componentInstance.estudiante = estudiante;
      modalRef.componentInstance.grupos = this.grupos;
    })
  }

  listarActividades() {
    this.estudianteService.getActividadesEstudiante(this.estudiante.id).subscribe(res => {
      this.estudiante.actividades = res.actividades;
      let actividadesActivas = []
      let actividadesInactivas = []
      res.actividades.forEach(element => {

        element.fecha_inicio = new Date(element.fecha_inicio).toLocaleDateString("es");

        if (element.activo) {
          actividadesActivas.push(element)
        }
        else {
          element.fecha_fin = new Date(element.fecha_fin).toLocaleDateString("es");
          actividadesInactivas.push(element)
        }
      });
      this.estudiante.actividades = actividadesActivas;
      this.estudiante.actividadesInac = actividadesInactivas;
    })
  }

  descargarHojaVida() {

    this.generadorPDF.downloadPdfHojaVida(this.estudiante);
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
      title: 'La descarga comenzara en breve: '
    })
  }

  getResumenAyudas() {
    this.ayudaService.resumenAyudasEstudiantes(this.estudiante.id).subscribe(res => {
      this.resumenAyudas = res.lista;
      console.log(this.resumenAyudas)
    })
  }
}
