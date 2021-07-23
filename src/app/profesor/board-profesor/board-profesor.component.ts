import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-profesor',
  templateUrl: './board-profesor.component.html',
  styleUrls: ['./board-profesor.component.scss']
})
export class BoardProfesorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navegacion(caso) {
    this.router.navigate(['profesor/' + caso]);

  }
}
