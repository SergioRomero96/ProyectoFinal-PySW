import { Component, OnInit } from '@angular/core';
import { Escribania } from 'src/app/models/escribania';
import { Escribano } from 'src/app/models/escribano';
import { LoginService } from 'src/app/services/login.service';
import { EscribaniaService } from 'src/app/services/escribania.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { PagoService } from 'src/app/services/pago.service';
import { Pago } from 'src/app/models/pago';
import { NovedadService } from 'src/app/services/novedad.service';
import { Novedad } from 'src/app/models/novedad';
import * as printJS from 'print-js';
import { Constantes } from 'src/app/models/constantes/constantes';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-escribanos',
  templateUrl: './escribanos.component.html',
  styleUrls: ['./escribanos.component.css']
})
export class EscribanosComponent implements OnInit {
  escribanias: Array<Escribania>;
  escribanos: Array<Escribano>;
  pagos: Array<Pago>;
  novedades: Array<Novedad>;
  escribano: Escribano;

  isUpdate: boolean = false;
  titulo: string;
  cargos = ["Titular", "Adscripto"];
  estados = ["Habilitado", "Inhabilitado"];
  impEscrib: JSON;

  constructor(public loginService: LoginService, private escribaniaService: EscribaniaService,
    private escribanoService: EscribanoService, private usuarioService: UsuarioService,
    public perfil: Constantes, 
    private toastr: ToastrService, private pagoService: PagoService, private novedadService: NovedadService) {
    this.escribanos = new Array<Escribano>();
    this.escribano = new Escribano();
    this.obtenerEscribanias();
    this.obtenerEscribanos();
    this.obtenerNovedades();
    this.obtenerPagos();
  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    $("#inputFoto").val(null);
    this.escribano = new Escribano();
    form.reset();
  }

  onFileChanges(files) {
    console.log("file change by method: ", files);
    this.escribano.usuario.foto = files[0].base64;
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Registrar Escribano";
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Actualizar Escribano";
  }

  obtenerPagos() {
    this.pagoService.getpagos()
      .subscribe(
        (result) => {
          this.pagos = result['pagos'];
          console.log(this.pagos);
        }
      );
  }

  obtenerEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        (result) => {
          console.log(result['escribanias']);
          this.escribanias = result['escribanias'];
        }
      );
  }

  obtenerEscribanos() {
    this.escribanos = new Array<Escribano>();
    this.escribanoService.getEscribanos()
      .subscribe(
        (result) => {
          /*result['escribanos'].forEach(element => {
            let e = new Escribano();
            e = element;
            e.fechaNacimiento = new Date(element['fechaNacimiento']['timestamp']*1000);
            this.escribanos.push(e);
          });*/
          console.log(result['escribanos']);
          this.escribanos = result['escribanos'];
          this.impEscrib = result['escribanos'];
        }
      );
  }

  obtenerNovedades() {
    this.novedadService.getNovedades()
      .subscribe(
        (result) => {
          this.novedades = result['novedades'];
          console.log(this.novedades);
        }
      );
  }

  showAgregar() {
    Swal.fire({
      title: 'Agregar Escribano',
      text: 'Escribano agregado correctamente',
      type: 'success'
    });
  }

  validarEscribano() {
    for (let e of this.escribanos)
      if (this.escribano.dni === e.dni)
        return true;
    return false;
  }



  public agregarEscribano(form: FormGroup) {
    if (!this.validarEscribano()) {
      this.escribanoService.addEscribano(this.escribano)
        .subscribe(
          (result) => {
            this.toastr.success("Escribano agregado correctamente", this.titulo);
            this.obtenerEscribanos();
            $('#escribanoModal').modal('hide');
          },
          error => {
            this.toastr.error("Error al agregar", this.titulo);
          }
        );

      this.limpiar(form);
    }
    else {
      this.toastr.warning("DNI del escribano ya se encuentra registrado", this.titulo);
    }
  }

  validarPagos(idEscribano: number) {
    for (let p of this.pagos)
      if (p.escribano.id === idEscribano)
        return true;
    return false;
  }

  validarNovedades(idEscribano: number) {
    for (let n of this.novedades)
      if (n.escribano.id === idEscribano)
        return true;
    return false;
  }

  public eliminarEscribano(escribano: Escribano) {
    let id = escribano.id;
    if (!this.validarPagos(id)) {
      if (!this.validarNovedades(id)) {
        this.escribanoService.deleteEscribano(id).then(
          result => {
            console.log("ESCRIBANO borrado correctamente.");
            this.obtenerEscribanos()
            return true;
          },
          error => {
            console.error("Escribano: Error al borrar!");
            console.log(error);
            return false;
          }
        )
      }
      else {
        this.toastr.warning("No se pudo borrar, el escribano registra novedades", "Eliminar Escribano")
      }
    }
    else {
      this.toastr.warning("No se pudo borrar, el escribano registra pagos", "Eliminar Escribano");
    }
  }

  public seleccionarEscribano(escribano: Escribano) {
    console.log(escribano);
    this.cambiarTituloModificar();
    console.log(escribano.fechaNacimiento);
    //Creo una copia del escribano recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.escribano = Object.assign(this.escribano, escribano);
    //se asigna a la propiedad escribano.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>
    this.escribano.escribania = this.escribanias.find(function (item: Escribania) {
      return item.id === escribano.escribania.id;
    });
  }

  public modificarEscribano(form: FormGroup) {
    console.log(this.escribano.fechaNacimiento);
    this.escribanoService.updateEscribano(this.escribano).subscribe(
      data => {
        this.toastr.success("Escribano actualizado correctamente", this.titulo);
        this.obtenerEscribanos();
        $('#escribanoModal').modal('hide');
        return true;
      },
      error => {
        this.toastr.error("Error al actualizar", this.titulo);
        console.log(error);
        return false;
      }
    );
    this.limpiar(form);
  }
  print(){

    printJS({printable: this.impEscrib, properties: ['dni', 'apellido', 'nombre', 'matricula', 'direccion', 'cargo'], type: 'json'})
   }
}
