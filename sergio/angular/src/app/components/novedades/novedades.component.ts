import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { Escribano } from 'src/app/models/escribano';
import { Constantes } from 'src/app/models/constantes/constantes';


declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  escribanos: Array<Escribano>;
  novedades: Array<Novedad>;
  novedad: Novedad;

  isUpdate: boolean = false;
  titulo: string;

  constructor(public loginService: LoginService, private novedadService: NovedadService,
    private escribanoService: EscribanoService, public perfil: Constantes) {
    console.log("usuarioLogueado: " + loginService.usuarioLogueado);
    console.log("localstorage: " + localStorage.length);
    this.novedad = new Novedad();
    this.obtenerNovedades();
    this.obtenerEscribanos();

  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    this.novedad = new Novedad();
    form.reset();
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Registrar novedad";
    //$('#novedadModal').modal({ backdrop: 'static', keyboard: false });
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Modificar novedad";
  }

  obtenerEscribanos() {
    this.escribanoService.getEscribanos()
      .subscribe(
        (result) => {
          this.escribanos = result['escribanos'];
          console.log("escribanos: " + this.escribanos);
        }
      );
  }

  obtenerNovedades() {
    this.novedadService.getNovedades()
      .subscribe(
        (result) => {
          this.novedades = result['novedades'];
          console.log("novedades: " + this.novedades);
        }
      );
  }

  public agregarNovedad(form: FormGroup) {
    //if (form.valid) {
    this.novedad.estado = "enviado";
    this.novedadService.addNovedad(this.novedad)
      .subscribe(
        (result) => {
          alert("novedad agregado correctamente.");
          this.obtenerNovedades();
          $('#novedadModal').modal('hide');
        },
        error => {
          alert("Error en el envio.");
        }
      );

    this.limpiar(form);
  }
  //}


  public eliminarNovedad(id: number) {
    console.log("eliminar: " + id);
    this.novedadService.deleteNovedad(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        //actualizo la tabla de escribanos
        this.obtenerNovedades()
        return true;
      },
      error => {
        console.error("Error al borrar!");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarNovedad(novedad: Novedad) {
    this.cambiarTituloModificar();
    //Creo una copia del escribano recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.novedad = Object.assign(this.novedad, novedad);
    //se asigna a la propiedad escribano.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>

    this.novedad.escribano = this.escribanos.find(function (item: Escribano) {
      return item.id === novedad.escribano.id;
    });
    console.log("escribano: " + this.novedad.escribano.apellido);
  }

  public modificarNovedad(form: FormGroup) {
    this.novedadService.updateNovedad(this.novedad).subscribe(
      data => {
        alert("modificado correctamente.")
        //actualizo la tabla de escribanos
        this.obtenerNovedades();
        $('#novedadModal').modal('hide');
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

}
