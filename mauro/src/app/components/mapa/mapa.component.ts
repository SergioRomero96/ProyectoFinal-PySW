import { EscribaniaService } from 'src/app/services/escribania.service';
import { Geometry } from './../../models/geometry';
import { MapaService } from './../../services/mapa.service';
import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/models/results';
import { Escribania } from 'src/app/models/escribania';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat: number = 0;
  lng: number = 0;
  geo: Geometry;
  results: Results;
  lista: Array<Results>;
  lista2: Array<Geometry>;
  escribanias: Array<Escribania>;
  escribania: Escribania;
  constructor(private service: MapaService,private escribaniaService: EscribaniaService) {
    this.results = new Results();
    this.lista = new Array<Results>();
    this.lista2 = new Array<Geometry>();
    this.geo = new Geometry;
    this.escribanias = new Array<Escribania>();
    this.obtenerEscribanias();
    this.escribania = new Escribania;
   }

  ngOnInit() {
  }


  obtenerEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        (result) => {
          this.escribanias = result['escribanias'];
        }
      );
  }

mostrar(){
  this.lista = new Array<Results>();
  this.results = new Results();
  console.log("largo de escribanias: "+this.escribanias.length);
  for(var i = 0; i< this.escribanias.length; i++){
    this.service.getLatLng(this.escribanias[i].direccion, this.escribanias[i].localidad)
    .subscribe(
      (result) =>  {
  result['results'].forEach(element => {
  Object.assign(this.results,element);
  this.lista.push(this.results);
console.log("Valores de la lista"+this.lista)
console.log("geometry"+this.lista[0].geometry.lat)
  });
  },
  error => { alert("Error en la petición"); } )
  }
}


// public mostrarEnMapa(escribania: Escribania) {
//   this.escribania = Object.assign(this.escribania, escribania);
//   this.lista = new Array<Results>();
//   this.results = new Results();
//     this.service.getLatLng(this.escribania.direccion, this.escribania.localidad)
//     .subscribe(
//       (result) =>  {
//         result['results'].forEach(element => {
//           Object.assign(this.results,element);
//           this.lista.push(this.results);
//         });
//         console.log("se guardó: "+ this.lista);
//       });
//       this.lat = this.lista[0].geometry.lat;
//   this.lng = this.lista[0].geometry.lng;
//   console.log("valores de lat y lng: " +this.lat +", " + this.lng);
// }

verLonguitudLatitud(escribania: Escribania){
  this.escribania = Object.assign(this.escribania, escribania);
  this.service.getLatLng(this.escribania.direccion, this.escribania.localidad)
  .subscribe(
    (data) => {
      this.lista = data["results"]
      this.asignarValor();
    }

    )


}
asignarValor(){

  this.lat = this.lista[0].geometry.lat;
  this.lng = this.lista[0].geometry.lng;
  console.log("valores de lat y lng: " +this.lat +", " + this.lng);
}

}

