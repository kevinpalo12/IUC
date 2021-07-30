import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarService } from 'src/app/services/autenticar.service';

@Component({
  selector: 'app-acudiente-nav',
  templateUrl: './acudiente-nav.component.html',
  styleUrls: ['./acudiente-nav.component.scss']
})
export class AcudienteNavComponent implements OnInit {

  nombre
  constructor(private autenticarService: AutenticarService, private router: Router) { }


  ngOnInit(): void {
  }

  cerrarSesion() {
    this.autenticarService.logout();
  }
}
