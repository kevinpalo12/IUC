import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hoja-vida',
  templateUrl: './hoja-vida.component.html',
  styleUrls: ['./hoja-vida.component.sass']
})
export class HojaVidaComponent implements OnInit, OnDestroy{

  id:number;
  private sub: any;


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   this.sub = this.route.params.subscribe(params => {
       this.id = +params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
