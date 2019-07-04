import { MapaService } from './../../services/mapa.service';
import { Component, OnInit } from '@angular/core';
import { Escribania } from 'src/app/models/escribania';
import { EscribaniaService } from 'src/app/services/escribania.service';
import { Constantes } from 'src/app/models/constantes/constantes';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Results } from 'src/app/models/results';
import { Geometry } from 'src/app/models/geometry';
import { ToastrService } from 'ngx-toastr';
import { EscribanoService } from 'src/app/services/escribano.service';
import { Escribano } from 'src/app/models/escribano';
import * as jsPDF from 'jspdf';
import * as printJS from 'print-js';


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
  escribanos: Array<Escribano>;
  lista: Array<Results>;
  results: Results;
  geo: Geometry;
  lat: number = 0;
  lng: number = 0;
  isUpdate: boolean = false;
  titulo: string;
  filterEscribania = '';
  escrib: JSON;

  constructor(public loginService: LoginService, private escribaniaService: EscribaniaService,
    public perfil: Constantes, private service: MapaService, private toastr: ToastrService,
    private escribanoService: EscribanoService) {
    this.escribania = new Escribania();
    this.escribanias = new Array<Escribania>();
    this.obtenerEscribanias();
    this.obtenerEscribanos();
  }

  ngOnInit() {
  }

  onFileChanges(files) {
    console.log("file change by method: ", files);
    this.escribania.foto = files[0].base64;
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
          this.escrib = result['escribanias'];
        }
      );
  }

  validarEscribania() {
    for (let e of this.escribanias)
      if (e.nombre === this.escribania.nombre)
        return true;
    return false;
  }

  public agregarEscribania(form: FormGroup) {
    if (!this.validarEscribania()) {
      this.escribaniaService.addEscribania(this.escribania)
        .subscribe(
          (result) => {
            this.toastr.success("Escribania agregada correctamente", this.titulo);
            this.obtenerEscribanias();
            $('#escribaniaModal').modal('hide');
          },
          error => {
            this.toastr.error("Error al agregar", this.titulo);
          }
        );
      this.limpiar(form);
    }
    else {
      this.toastr.warning("Escribania ya se encuentra registrada", this.titulo);
    }
  }

  obtenerEscribanos() {
    this.escribanoService.getEscribanos().subscribe(
      (result) => {
        this.escribanos = result['escribanos'];
        console.log(this.escribanos);
      }
    );

  }

  validarEscribanos(idEscribania: number) {
    for (let e of this.escribanos)
      if (e.escribania.id === idEscribania)
        return true;
    return false;
  }

  public eliminarEscribania(id: number) {
    if (!this.validarEscribanos(id)) {
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
    else {
      this.toastr.warning("No se pudo borrar la escribania, porque posee escribanos asociados", "Eliminar Escribania");
    }
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
        this.toastr.success("Escribania actualizada correctamente", this.titulo);
        this.obtenerEscribanias();
        $('#escribaniaModal').modal('hide');
        return true;
      },
      error => {
        this.toastr.success("Error al actualizar", this.titulo);
        console.log(error);
        return false;
      }
    );
    this.limpiar(form);
  }

  public limpiar(form: FormGroup) {
    this.escribania = new Escribania();
    $("#inputFoto").val(null);
    form.reset();
  }



  verLonguitudLatitud(escribania: Escribania) {
    console.log("la escribania es: " + escribania.nombre)
    this.escribania = Object.assign(this.escribania, escribania);
    this.service.getLatLng(this.escribania.direccion, this.escribania.localidad)
      .subscribe(
        (data) => {
          this.lista = data["results"]
          this.asignarValor();
        }

      );


  }
  asignarValor() {

    this.lat = this.lista[0].geometry.lat;
    this.lng = this.lista[0].geometry.lng;
    console.log("valores de lat y lng: " + this.lat + ", " + this.lng);
  }


  generarPDF() {
    var doc = document.getElementById("tablaEscribania");
    var pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFontSize(22);
    pdf.text("Listado de Escribania", 80, 20);
    pdf.setFontSize(10);
    pdf.fromHTML(doc, 10, 30);
    pdf.save("Escribano.pdf");
  }
 print(){
  printJS({printable: this.escrib, properties: ['id', 'nombre', 'direccion',  'localidad',  'telefono'], type: 'json'})
 }
}
