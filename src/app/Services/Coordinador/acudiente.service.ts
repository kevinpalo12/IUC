import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/common/global.constants';
import { Acudiente } from 'src/app/common/modelos/Acudiente';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AcudienteService {

  private urlEndPoint = GlobalConstants.URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }

  create(acudiente: Acudiente):Observable<any> {
    let acu:any= acudiente;
    acu.clave = (Math.random()*99999999).toFixed(0);
    return this.http.post(this.urlEndPoint + 'acudiente/create', acudiente)
  }

  buscarCedula(cedula: string): Observable<any> {
    return this.http.get(this.urlEndPoint + 'acudiente/cedula/'+cedula)
  }

  actualizar(acudiente:Acudiente):Observable<any>{
    return this.http.put(this.urlEndPoint+'acudiente/'+acudiente.id,acudiente,{headers:this.httpHeaders})
  }
}
