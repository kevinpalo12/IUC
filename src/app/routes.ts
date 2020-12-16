import { AcudienteComponent } from "./acudiente/acudiente.component";
import { CoordinadorComponent } from "./coordinador/coordinador.component";
import { DashBoardComponent } from "./coordinador/dash-board/dash-board.component";
import { HojaVidaComponent } from "./coordinador/hoja-vida/hoja-vida.component";
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
            path: 'estudiante/:id',
            component: HojaVidaComponent,
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