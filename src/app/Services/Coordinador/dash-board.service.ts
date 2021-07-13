import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  private URL = GlobalConstants.URL;

  constructor(private http: HttpClient) { }

  obtenerNumeros() {
    const respuesta = this.http.get<any>(this.URL + '/coordinador/number');
    return respuesta;
  }
}
