import { AcudienteComponent } from "./acudiente/acudiente.component";
import { CoordinadorComponent } from "./coordinador/coordinador.component";
import { DashBoardComponent } from "./coordinador/dash-board/dash-board.component";
import { GruposComponent } from "./coordinador/grupos/grupos.component";
import { HojaVidaComponent } from "./coordinador/hoja-vida/hoja-vida.component";
import { ListaAyudasComponent } from "./coordinador/lista-ayudas/lista-ayudas.component";
import { ListaEstudiantesComponent } from "./coordinador/lista-estudiantes/lista-estudiantes.component";
import { ListaProfesoresComponent } from "./coordinador/lista-profesores/lista-profesores.component";
import { LoginComponent } from "./login/login.component";
import { ProfesorComponent } from "./profesor/profesor.component";

export const routeList=[
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'coordinador',
      component: CoordinadorComponent,
      children:[
          {
            path: 'inicio',
            component: DashBoardComponent,
          },
          {
            path: 'estudiante/page/:page',
            component: ListaEstudiantesComponent,
          },
          {
            path: 'profesores',
            component: ListaProfesoresComponent,
          },
          {
            path: 'grupos',
            component: GruposComponent,
          },
          {
            path: 'ayudas',
            component: ListaAyudasComponent,
          },
          {
            path: 'estudiante/:id',
            component: HojaVidaComponent,
          },
          {
            path: '**',
            redirectTo: 'inicio'
          },
      ]

      
    },
    {
      path: 'profesor',
      component: ProfesorComponent,
    },
    {
      path: 'acudiente',
      component: AcudienteComponent,
    },
    {
      path: '**',
      redirectTo: 'login'
    }
  
  ];