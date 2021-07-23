import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-nav-profesor',
  templateUrl: './nav-profesor.component.html',
  styleUrls: ['./nav-profesor.component.scss']
})
export class NavProfesorComponent implements OnInit {

  nombre=''
  constructor(private autenticarService: AutenticarService, private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.autenticarService.logout();
  }

}
