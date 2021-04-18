import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global.constants';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL = GlobalConstants.URL;
  nombreInicio ='';

  constructor(private http: HttpClient, private router: Router) { }

  signin(user) {
    console.log(this.URL);
    const respuesta = this.http.post<any>(this.URL + '/signin', user);
    respuesta.subscribe(
      res=>{
       localStorage.setItem('nombre',res.nombre);
      }
    );    
    return respuesta;
  }

  loggedIn() {
    return !!sessionStorage.getItem('token');
  }

  getToken() {
    return sessionStorage.getItem('token');
  }
  logout() {
    sessionStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
