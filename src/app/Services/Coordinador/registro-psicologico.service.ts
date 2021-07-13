import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class RegistroPsicologicoService {

  private urlEndPoint = GlobalConstants.URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient) { }

  create(registro):Observable<any>{   
    return this.http.post(this.urlEndPoint+'psicologico/create', registro, {headers: this.httpHeaders});
 }

 getRegistros(estudiante):Observable<any>{
   return this.http.get(this.urlEndPoint+`psicologico/registros/${estudiante}`,{headers: this.httpHeaders} )
 }

}
