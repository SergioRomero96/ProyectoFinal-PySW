import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escribano } from '../models/escribano';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class EscribanoService {

  constructor(private _http: HttpClient) { }

  public getEscribanoByUsuario(usuario: Usuario): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    console.log("usuario: " + body);
    return this._http.post("http://localhost/colegioEscribanos/public/index.php/escribano/getEscribanoByUsuario",
      body, httpOption);
  }

  public getEscribanos(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost/colegioEscribanos/public/index.php/escribano/", httpOption);
  }

  public addEscribano(escribano: Escribano) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(escribano);
    console.log("body escribano:" + body);
    return this._http.post("http://localhost/colegioEscribanos/public/index.php/escribano/new", body, httpOption);
  }

  public deleteEscribano(id: number) {
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/colegioEscribanos/public/index.php/escribano/' + id)).toPromise();
  }

  updateEscribano(escribano: Escribano) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(escribano);
    console.log("modificar: "+body);
    //envio en el body el escribano transformado en un JSON
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/escribano/' + escribano.id + '/edit', body, httpOption);
  }

}
