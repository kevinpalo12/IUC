import { Injectable } from '@angular/core';
import { Estudiante } from '../../common/modelos/estudiante';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es-Co';
import { GlobalConstants } from 'src/app/common/global.constants';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private urlEndPoint = GlobalConstants.URL;
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

  getEstudiantes(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/estudiante/page/' + page).pipe(
      tap((response: any) => {
        (response.content as Estudiante[]).forEach(estudiante => {
        });
      }),
      map((response: any) => {
        (response.content as Estudiante[]).map(estudiante => {          
          estudiante.nombre = estudiante.nombre.charAt(0).toUpperCase() + estudiante.nombre.slice(1).toLowerCase();
          estudiante.apellido = estudiante.apellido.charAt(0).toUpperCase() + estudiante.apellido.slice(1).toLowerCase();
          let datePipe = new DatePipe('es');
          // estudiante.createAt = datePipe.transform(estudiante.createAt, 'fullDate');
          // ejemplos de variaciones para las fechas
          // estudiante.createAt = datePipe.transform(estudiante.createAt, 'EEE dd/MM MMMM/yyyy', 'en-US');
          return estudiante;
        });
        return response;
      }),
      tap(response => {
        (response.content as Estudiante[]).forEach(estudiante => {

        });
      })
    );
  }
  getEstudiantesFiltro(nombre, apellido, identificacion, page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + 'estudiante/filtro/' + nombre + '/' + apellido + '/' + identificacion + '/' + page).pipe(
      tap((response: any) => {
        (response.content as Estudiante[]).forEach(estudiante => {
        });
      }),
      map((response: any) => {
        (response.content as Estudiante[]).map(estudiante => {
          estudiante.nombre = estudiante.nombre.charAt(0).toUpperCase() + estudiante.nombre.slice(1).toLowerCase();
          estudiante.apellido = estudiante.apellido.charAt(0).toUpperCase() + estudiante.apellido.slice(1).toLowerCase();
          let datePipe = new DatePipe('es');
          // estudiante.createAt = datePipe.transform(estudiante.createAt, 'fullDate');
          // ejemplos de variaciones para las fechas
          // estudiante.createAt = datePipe.transform(estudiante.createAt, 'EEE dd/MM MMMM/yyyy', 'en-US');
          return estudiante;
        });
        return response;
      }),
      tap(response => {
        (response.content as Estudiante[]).forEach(estudiante => {

        });
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlEndPoint}/estudiante/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  porGrupo(id,page): Observable<any> {
    return this.http.get(this.urlEndPoint + '/estudiante/grupo/'+id+'/'+page);
  }

  porGrupoNoPage(id): Observable<any> {
    return this.http.get(this.urlEndPoint + '/estudiante/grupo/'+id);
  }

  create(estudiante: Estudiante):Observable<any>{   
     return this.http.post(this.urlEndPoint+'estudiante/create', estudiante, {headers: this.httpHeaders}).pipe(
        map((response: any) => response.estudiante as Estudiante),
        catchError(e => {
          if(e.status == 400){
            return throwError(e);
          }
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }

  actualizar(estudiante:Estudiante):Observable<any>{
    return this.http.put(this.urlEndPoint+'estudiante/'+estudiante.id,estudiante,{headers:this.httpHeaders})
  }

  addAyuda(estudiante:number, ayuda:number):Observable<any>{
    return this.http.put(this.urlEndPoint+`estudiante/addAyuda/${estudiante}/${ayuda}`,{headers:this.httpHeaders})
  }


  getEstudiante(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint + '/estudiante/'+id);
  }

  getActividadesEstudiante(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint + '/estudiante/actividades/'+id);
  }
  
  getUltimaExcusa(id:number):Observable<any>{
    return this.http.get(this.urlEndPoint+'/estudiante/inasistencia/ultima/'+id);
  }

  agregarInasistencia(inasistencia):Observable<any>{
    return this.http.post(this.urlEndPoint+`/inasistencia/create`,inasistencia)
  }

  agregarExcusa(file,id):Observable<any>{
    return this.http.post(this.urlEndPoint+`/inasistencia/saveExcusa/${id}`,file);
  }
}
