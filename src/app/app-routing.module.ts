import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcudienteComponent } from './acudiente/acudiente.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { LoginComponent } from './login/login.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { routeList } from "./routes";

const routes: Routes = routeList;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
