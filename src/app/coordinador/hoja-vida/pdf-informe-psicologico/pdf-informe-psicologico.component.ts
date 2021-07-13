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
  estudiante:Estudiante;
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];


  ngOnInit(): void {
  }

  downloadPdf(estudiante) {
    this.estudiante = estudiante
    this.estudiante['solicitud'] = new Date()
    this.estudiante.nacimiento=new Date(estudiante.nacimiento)
    this.obtenerRegistrosEstudiante(estudiante.id)


  }


  obtenerRegistrosEstudiante(estudiante: number) {
    this.registroService.getRegistros(estudiante).subscribe(
      res => {
        this.registros = res;
        this.descargar()
      }
    )
  }

  descargar(){
    let nombre = this.estudiante.nombre.split(' ');
    let apellido = this.estudiante.apellido.split(' ');
    let final='';
    nombre.forEach(element => {
      final+=element+'_'
    });
    apellido.forEach(element => {
      final+=element+'_'
    });
   final= final.substr(0,final.length-1)
    var element = document.getElementById('element-to-print');
    var opt = {
      margin: 1,
      filename: `Historial_Acompanamientos_${final}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    var worker = html2pdf().set(opt).from(element).save();
  }
}
