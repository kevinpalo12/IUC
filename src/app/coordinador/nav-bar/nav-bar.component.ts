import { Component, OnInit, SimpleChange, HostListener, Directive } from '@angular/core';
import { AutenticarService } from "../../services/autenticar.service";

import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  constructor( private autenticarService: AutenticarService, private router: Router) { }
  nombre='';
  ngOnInit() {
    if(this.autenticarService.loggedIn()!=null){
      this.numeroPendientes();
    }
    this.nombre=localStorage.getItem('nombre');
    
  }
  parametros = {
    central: '%'
  }
  
  nroPendiente:number = 0;

 public numeroPendientes() {

  }

  cerrarSesion(){
    this.autenticarService.logout();
  }

}
