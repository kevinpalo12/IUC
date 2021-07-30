import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private urlEndPoint = GlobalConstants.URL + 'profesor/';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  getProfesores(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + `page/${page}`)
  }

  createProfesor(profesor):Observable<any>{
    return this.http.post(this.urlEndPoint+`create`, profesor)
  }

  delete(profesor:number):Observable<any>{
    return this.http.delete(this.urlEndPoint+profesor);
  }

  profesoresSinGrupo():Observable<any>{
    return this.http.get(this.urlEndPoint+`sin-grupo`)
  }
}
