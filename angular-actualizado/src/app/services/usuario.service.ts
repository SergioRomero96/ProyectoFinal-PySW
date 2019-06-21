import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private _http: HttpClient) { }

  public getUsuarios(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost/colegioEscribanos/public/index.php/usuario/", httpOption);
  }

  public addUsuario(usuario: Usuario) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    console.log("body usuario: " + body);
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/usuario/new', body, httpOption);
  }

  public deleteUsuario(id: number) {
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/colegioEscribanos/public/index.php/usuario/' + id));
  }

  public updateUsuario(usuario: Usuario) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(usuario);
    //envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/usuario/' + usuario.id + '/edit',
      body, httpOption);
  }
}
