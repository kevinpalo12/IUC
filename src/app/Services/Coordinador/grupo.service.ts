import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private urlEndPoint = GlobalConstants.URL+'grupo/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  listarGrupos():Observable<any>{
   return this.http.get(this.urlEndPoint + 'index');
  }

  getGrupos(page:number):Observable<any>{
    return this.http.get(this.urlEndPoint+`/page/${page}`)
  }

  nroEstudiantes(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+`nro/${id}`)
  }

  create(grupo):Observable<any>{
    return this.http.post(this.urlEndPoint+`create`,grupo)
  }
}
