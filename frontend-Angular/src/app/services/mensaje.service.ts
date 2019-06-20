import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private _http: HttpClient) { }

  getMensajes(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost/mensajeProyect/public/index.php/mensaje/", httpOption);
  }

  getEmpresas(): Observable<any> {
    return this._http.get('http://localhost/mensajeProyect/public/index.php/empresa/')
  }

  public sendMensaje(mensaje) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(mensaje);
    return this._http.post('http://localhost/mensajeProyect/public/index.php/mensaje/new', body,
      httpOption);
  }

}
