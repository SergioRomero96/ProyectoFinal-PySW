import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapaService {

  constructor(private _http: HttpClient) {
  }

  public getLatLng(direccion: string, localidad: string):Observable<any>{
var pais = "Argentina"
var provincia = "Jujuy";
direccion = direccion.replace(/ /g, '%20' );
localidad = localidad.replace(/ /g, '%20' );
direccion = direccion.replace(/º/g, '%C2%BA' );

console.log("La direccion es: " + direccion);
console.log("La la localidad es: " + localidad);
   return this._http.get("https://api.opencagedata.com/geocode/v1/json?q="+direccion+"%20"+localidad+"%20"+provincia+"%20"+pais+".&key=6c7a340dbe5240dba7bcc39458251089&language=es&pretty=1");

   }
}
