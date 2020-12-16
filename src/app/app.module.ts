import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { HojaVidaComponent } from './Coordinador/hoja-vida/hoja-vida.component';
import { DashBoardComponent } from './Coordinador/dash-board/dash-board.component';
import { NavBarComponent } from './Coordinador/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoordinadorComponent,
    ProfesorComponent,
    AcudienteComponent,
    HojaVidaComponent,
    DashBoardComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
