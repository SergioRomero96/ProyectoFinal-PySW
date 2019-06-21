import { Injectable } from '@angular/core';

// Importamos los componentes que vamos a usar
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escribania } from '../models/escribania';

@Injectable({
  providedIn: 'root'
})
export class EscribaniaService {

  constructor(private _http: HttpClient) { }

  public getEscribanias(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this._http.get("http://localhost/colegioEscribanos/public/index.php/escribania/", httpOption);
  }

  public addEscribania(escribania: Escribania) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(escribania);
    console.log("body: " + body);
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/escribania/new', body, httpOption);
  }

  public deleteEscribania(id: number) {
    //utilizo el metodo delete de http que es el configurado en el deleteAction de Symfony
    return this._http.delete(('http://localhost/colegioEscribanos/public/index.php/escribania/' + id));
  }

  public updateEscribania(escribania: Escribania) {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let body = JSON.stringify(escribania);
    //envio en el body el mensaje transformado en un JSON
    return this._http.post('http://localhost/colegioEscribanos/public/index.php/escribania/' + escribania.id + '/edit',
      body, httpOption);
  }
}
