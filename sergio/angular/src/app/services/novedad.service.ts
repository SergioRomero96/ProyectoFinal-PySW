import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Novedad } from '../models/novedad';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  constructor(private _http: HttpClient) { }

  public getNovedades(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost/colegioEscribanos/public/index.php/novedad/", httpOption);
  }

  public getNovedadesByEscribano(usuario: Usuario): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    console.log("novedadUsuario: " + body);
    return this._http.post("http://localhost/colegioEscribanos/public/index.php/novedad/novedadByEscribano",
      body, httpOption);
  }

  public addNovedad(novedad: Novedad) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(novedad);
    console.log("body novedad:" + body);
    return this._http.post("http://localhost/colegioEscribanos/public/index.php/novedad/new", body, httpOption);
  }

  deleteNovedad(id: number) {
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/colegioEscribanos/public/index.php/novedad/' + id));
  }

  updateNovedad(novedad: Novedad) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(novedad);
    //envio en el body el novedad transformado en un JSON
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/novedad/' + novedad.id + '/edit', body, httpOption);
  }
}
