import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { CoordinadorComponent } from './coordinador/coordinador.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { AcudienteComponent } from './acudiente/acudiente.component';
import { HojaVidaComponent } from './coordinador/hoja-vida/hoja-vida.component';
import { DashBoardComponent } from './coordinador/dash-board/dash-board.component';
import { NavBarComponent } from './coordinador/nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutenticarService } from './services/autenticar.service';
import { HttpClientModule } from '@angular/common/http';
import { ListaEstudiantesComponent } from './coordinador/lista-estudiantes/lista-estudiantes.component';
import { ListaAyudasComponent } from './coordinador/lista-ayudas/lista-ayudas.component';
import { GruposComponent } from './coordinador/grupos/grupos.component';
import { ListaProfesoresComponent } from './coordinador/lista-profesores/lista-profesores.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoordinadorComponent,
    ProfesorComponent,
    AcudienteComponent,
    HojaVidaComponent,
    DashBoardComponent,
    NavBarComponent,
    ListaEstudiantesComponent,
    ListaAyudasComponent,
    GruposComponent,
    ListaProfesoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule

  ],
  providers: [AutenticarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
