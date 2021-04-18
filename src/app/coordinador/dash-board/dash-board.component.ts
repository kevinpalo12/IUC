import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from 'src/app/services/Coordinador/dash-board.service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {

  estudiantes: number;
  ayudas: number;
  profesores: number;
  grupos: number;

  constructor(private router: Router, private dashboardService: DashBoardService) {

    this.estudiantes = 0;
    this.ayudas = 0;
    this.profesores = 0;
    this.grupos = 0;

  }

  ngOnInit(): void {
    this.dashboardService.obtenerNumeros().subscribe(res => {
      if (res.mensaje) {
        res=res.respuesta;
        this.estudiantes = res.estudiantes;
        this.grupos = res.grupos;
        this.ayudas=res.ayudas;
        this.profesores=res.profesor;
      }     
    })
  }

  navegacion(caso) {

    this.router.navigate(['coordinador/' + caso]);
  }
}
