import { AcudidosComponent } from "./acudiente/acudidos/acudidos.component";
import { AcudienteComponent } from "./acudiente/acudiente.component";
import { CoordinadorComponent } from "./coordinador/coordinador.component";
import { DashBoardComponent } from "./coordinador/dash-board/dash-board.component";
import { GruposComponent } from "./coordinador/grupos/grupos.component";
import { HojaVidaComponent } from "./coordinador/hoja-vida/hoja-vida.component";
import { ListaAyudasComponent } from "./coordinador/lista-ayudas/lista-ayudas.component";
import { ListaEstudiantesComponent } from "./coordinador/lista-estudiantes/lista-estudiantes.component";
import { ListaProfesoresComponent } from "./coordinador/lista-profesores/lista-profesores.component";
import { LoginComponent } from "./login/login.component";
import { BoardProfesorComponent } from "./profesor/board-profesor/board-profesor.component";
import { ProfesorComponent } from "./profesor/profesor.component";
import { TomarAsistenciaComponent } from "./profesor/tomar-asistencia/tomar-asistencia.component";
import { VerEstudianteComponent } from "./profesor/ver-estudiante/ver-estudiante.component";

export const routeList = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'coordinador',
    component: CoordinadorComponent,
    children: [
      {
        path: 'inicio',
        component: DashBoardComponent,
      },
      {
        path: 'estudiante/page/:page',
        component: ListaEstudiantesComponent,
      },
      {
        path: 'profesores/page/:page',
        component: ListaProfesoresComponent,
      },
      {
        path: 'grupos/page/:page',
        component: GruposComponent,
      },
      {
        path: 'ayudas/page/:page',
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
    children: [
      {
        path: 'inicio',
        component: BoardProfesorComponent,
      },
      {
        path: 'asistencia',
        component: TomarAsistenciaComponent,
      },
      {
        path: 'estudiantes',
        component: VerEstudianteComponent,
      },
      {
        path: '**',
        redirectTo: 'inicio'
      }
    ]
  },
  {
    path: 'acudiente',
    component: AcudienteComponent,
    children: [
      {
        path: 'encargados/:cedula',
        component: AcudidosComponent,
      },
      {
        path: '**',
        redirectTo: 'encargados/:cedula'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }

];