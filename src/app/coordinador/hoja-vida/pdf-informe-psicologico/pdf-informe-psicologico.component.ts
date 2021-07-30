import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js'
import { Estudiante } from 'src/app/common/modelos/estudiante';
import { RegistroPsicologicoService } from 'src/app/Services/Coordinador/registro-psicologico.service';
@Component({
  selector: 'app-pdf-informe-psicologico',
  templateUrl: './pdf-informe-psicologico.component.html',
  styleUrls: ['./pdf-informe-psicologico.component.scss']
})
export class PdfInformePsicologicoComponent implements OnInit {

  constructor(private registroService: RegistroPsicologicoService) { }

  registros;
  estudiante: Estudiante;
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];


  ngOnInit(): void {
  }

  downloadPdfPsicologico(estudiante) {
    this.estudiante = estudiante
    this.estudiante['solicitud'] = new Date()
    this.estudiante.nacimiento = new Date(estudiante.nacimiento)
    this.obtenerRegistrosEstudiante(estudiante.id)
  }


  obtenerRegistrosEstudiante(estudiante: number) {
    this.registroService.getRegistros(estudiante).subscribe(
      res => {
        this.registros = res;
        this.descargar(true)
      }
    )
  }

  descargar(psicologico: boolean) {
    let nombre = this.estudiante.nombre.split(' ');
    let apellido = this.estudiante.apellido.split(' ');
    let final = '';
    let elementPrint = ''
    if (psicologico) {
      final = 'Historial_Acompanamientos_'
      elementPrint = 'element-to-print-psicologico'
    } else {
      final = 'Hoja_de_vida_'
      elementPrint = 'element-to-print-vida'
    }

    nombre.forEach(element => {
      final += element + '_'
    });
    apellido.forEach(element => {
      final += element + '_'
    });
    final = final.substr(0, final.length - 1)
    var element = document.getElementById(elementPrint);
    var opt = {
      margin: 1,
      filename: `Historial_Acompanamientos_${final}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    var worker = html2pdf().set(opt).from(element).save();
  }

  //
  downloadPdfHojaVida(estudiante) {
    this.estudiante = estudiante
    this.estudiante['solicitud'] = new Date()
    this.estudiante.nacimiento = new Date(estudiante.nacimiento)
    this.filtrarAyudas();
    setTimeout(() => {
      this.descargar(false)
    }, 100);

  }

  filtrarAyudas() {
   
    this.estudiante.ayudas = this.estudiante.ayudas.filter(ayuda => new Date(ayuda.fechaEntrega) <= new Date())
  }
}
