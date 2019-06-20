import { Injectable } from '@angular/core';

//AGREGADO
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
//AGREGADO

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLogueado: boolean;
  usuarioLogueado: Usuario;

  constructor(private _http: HttpClient) {
    this.getUsuarioSesion();
  }

  getUsuarioSesion(){
    if(localStorage.length != 0){
      this.isLogueado = true;
      this.usuarioLogueado = JSON.parse(localStorage.getItem('usuarioSesion'));
    }
  }

  public login(userName: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ userName: userName, password: password });
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/usuario/login',
      body, httpOption);
  }
  
  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('usuarioSesion');
    this.usuarioLogueado = new Usuario();
    this.isLogueado = false;
  }
}
