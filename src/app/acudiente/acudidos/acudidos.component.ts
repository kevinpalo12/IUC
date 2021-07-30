import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acudidos',
  templateUrl: './acudidos.component.html',
  styleUrls: ['./acudidos.component.scss']
})
export class AcudidosComponent implements OnInit {

  sub
  id
  constructor( private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['cedula'];
    });
  }

}
