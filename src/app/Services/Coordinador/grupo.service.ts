import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {
  private urlEndPoint = GlobalConstants.URL;
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) { }

  listarGrupos():Observable<any>{
   return this.http.get(this.urlEndPoint + '/grupo/index');
  }
}
