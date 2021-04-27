import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class AyudaService {
  private urlEndPoint = GlobalConstants.URL+'ayuda/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getAyudas(): Observable<any> {
    return this.http.get(this.urlEndPoint + 'all')
  }

  getAyudasCantidad():Observable<any>{
    return this.http.get(this.urlEndPoint+'allCantidad')
  }

  crear(ayuda):Observable<any>{
    return this.http.post(this.urlEndPoint+'create',ayuda);
  }

  actualizarEntrega(ayuda):Observable<any>{
    return this.http.put(this.urlEndPoint+`agregarEntrega/${ayuda.id}`,{proxima:ayuda.proxima})
  }

  listaEstudiante(filtro,page):Observable<any>{
    return this.http.post(this.urlEndPoint+`listFiltro/${page}`,filtro);
  }
}
