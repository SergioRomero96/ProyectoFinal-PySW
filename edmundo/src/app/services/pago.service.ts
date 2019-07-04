import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private _http: HttpClient) { }

  public getpagos(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost/colegioEscribanos/public/index.php/pago/", httpOption);
  }

  public addpago(pago: Pago) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(pago);
    console.log("body pago:" + body);
    return this._http.post("http://localhost/colegioEscribanos/public/index.php/pago/new", body, httpOption);
  }

  deletepago(id: number) {
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/colegioEscribanos/public/index.php/pago/' + id));
  }

  updatepago(pago: Pago) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(pago);
    console.log("body modificar: " + body);
    //envio en el body el pago transformado en un JSON
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/pago/' + pago.id + '/edit', body, httpOption);
  }
}
