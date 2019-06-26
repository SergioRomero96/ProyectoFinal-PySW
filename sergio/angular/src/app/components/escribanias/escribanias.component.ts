import { MapaService } from './../../services/mapa.service';
import { Component, OnInit } from '@angular/core';
import { Escribania } from 'src/app/models/escribania';
import { EscribaniaService } from 'src/app/services/escribania.service';
import { Constantes } from 'src/app/models/constantes/constantes';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Results } from 'src/app/models/results';
import { Geometry } from 'src/app/models/geometry';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-escribanias',
  templateUrl: './escribanias.component.html',
  styleUrls: ['./escribanias.component.css']
})
export class EscribaniasComponent implements OnInit {
  escribania: Escribania;
  escribanias: Array<Escribania>;
  lista: Array<Results>;
  results: Results;
  geo: Geometry;
  lat: number = 0;
  lng: number = 0;
  isUpdate: boolean = false;
  titulo: string;
  filterEscribania = '';

  constructor(public loginService:LoginService, private escribaniaService: EscribaniaService, public perfil: Constantes, private service: MapaService) {
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.obtenerEscribanias();
  }

  ngOnInit() {
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Agregar Escribania";
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Modificar Escribania";
  }

  obtenerEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        (result) => {
          this.escribanias = result['escribanias'];
          console.log(this.escribanias);
        }
      );
  }

  public agregarEscribania(form: FormGroup) {
    //if (form.valid) {
    this.escribaniaService.addEscribania(this.escribania)
      .subscribe(
        (result) => {
          alert("agregado correctamente.");
          this.obtenerEscribanias();
          $('#escribaniaModal').modal('hide');
        },
        error => {
          alert("Error en el envio.");
        }
      );
    this.limpiar(form);
    //}
  }

  public eliminarEscribania(id: number) {
    this.escribaniaService.deleteEscribania(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        //actualizo la tabla de escribanias
        this.obtenerEscribanias()
        return true;
      },
      error => {
        console.error("Error al borrar!");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarEscribania(escribania: Escribania) {
    this.cambiarTituloModificar();
    //Creo una copia de la escribania recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.escribania = Object.assign(this.escribania, escribania);
  }

  public modificarEscribania(form: FormGroup) {
    this.escribaniaService.updateEscribania(this.escribania).subscribe(
      data => {
        alert("modificado correctamente.")
        //actualizo la tabla de escribanias
        this.obtenerEscribanias();
        $('#escribaniaModal').modal('hide');
        return true;
      },
      error => {
        console.error("Error updating!");
        console.log(error);
        return false;
      }
    );
    this.limpiar(form);
  }

  public limpiar(form: FormGroup) {
    this.escribania = new Escribania();
    form.reset();
  }



  verLonguitudLatitud(escribania: Escribania){
    console.log("la escribania es: " + escribania.nombre)
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
