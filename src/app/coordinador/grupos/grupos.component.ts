import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Grupo } from 'src/app/common/modelos/grupo';
import { GrupoService } from 'src/app/services/Coordinador/grupo.service';
import { ProfesorService } from 'src/app/Services/Coordinador/profesor.service';
import { CrearProfesorComponent } from '../lista-profesores/crear-profesor/crear-profesor.component';
import { CrearGrupoComponent } from './crear-grupo/crear-grupo.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.scss']
})
export class GruposComponent implements OnInit {

  paginador
  grupos: any[]
  constructor(private activateRoute: ActivatedRoute,
    private grupoService: GrupoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.listarGrupos();

  }

  crearGrupo() {
    const modalRef = this.modalService.open(CrearGrupoComponent, { size: 'l', scrollable: true });
    modalRef.componentInstance.data = {
    }
    modalRef.result.then((data) => {
      this.listarGrupos();
    })
  }

  listarGrupos() {
    this.activateRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page') || 0;
      if (!page) {
        page = 0;
      }
      this.grupoService.getGrupos(page)
        .subscribe(response => {
          this.grupos = response.content as Grupo[]
          this.paginador = response;
          this.getNumerosEstudiantes()
        });
    })
  }

  getNumerosEstudiantes() {

    this.grupos.forEach(element => {
      this.grupoService.nroEstudiantes(element.id).subscribe(res => {
        let num = this.grupos.indexOf(element);
        this.grupos[num]['nroEstudiantes'] = res.numero.count || 0;
      })
    });
  }


}
