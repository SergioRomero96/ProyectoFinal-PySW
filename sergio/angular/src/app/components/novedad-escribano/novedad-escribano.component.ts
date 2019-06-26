import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { Constantes } from 'src/app/models/constantes/constantes';

declare var $: any;

@Component({
  selector: 'app-novedad-escribano',
  templateUrl: './novedad-escribano.component.html',
  styleUrls: ['./novedad-escribano.component.css']
})
export class NovedadEscribanoComponent implements OnInit {
  novedades: Array<Novedad>;
  novedadesRecibidas: Array<Novedad>;
  novedadesEnviadas: Array<Novedad>;
  novedad: Novedad;

  isVer: boolean = false;
  titulo: string;

  constructor(public loginService: LoginService, private novedadService: NovedadService, public perfil: Constantes) {
    console.log("usuarioLogueado: " + loginService.usuarioLogueado);
    console.log("localstorage: " + localStorage.length);
    this.novedad = new Novedad();
    this.novedadesEnviadas = new Array<Novedad>();
    this.novedadesRecibidas = new Array<Novedad>();
    this.obtenerNovedades();

  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    this.novedad = new Novedad();
    form.reset();
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isVer = false;
    this.titulo = "Registrar novedad";
    //$('#novedadModal').modal({ backdrop: 'static', keyboard: false });
  }

  cambiarTituloVer() {
    this.isVer = true;
    this.titulo = "Detalle de la novedad";
  }

  obtenerNovedades() {
    this.novedadService.getNovedadesByEscribano(this.loginService.usuarioLogueado)
      .subscribe(
        (result) => {
          //this.novedadesRecibidas = result['novedades'];
          //console.log(this.novedadesRecibidas);
          result['novedades'].forEach(element => {
            let novedad = new Novedad();
            Object.assign(novedad, element);
            if(novedad.estado == "enviado")
              this.novedadesRecibidas.push(novedad);
            else
              this.novedadesEnviadas.push(novedad);
          });
        }
      );
      console.log(this.novedadesRecibidas);
  }

  public agregarNovedad(form: FormGroup) {
    //if (form.valid) {
    this.novedad.estado = "no leido";
    this.novedad.escribano = this.novedadesEnviadas[0].escribano;
    this.novedadService.addNovedad(this.novedad)
      .subscribe(
        (result) => {
          alert("el mensaje se envio correctamente.");
          this.obtenerNovedades();
          $('#novedadModal').modal('hide');
        },
        error => {
          alert("Error en el envio.");
        }
      );

    this.limpiar(form);
  }

  public seleccionarNovedad(novedad: Novedad) {
    this.cambiarTituloVer();
    //Creo una copia del escribano recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.novedad = Object.assign(this.novedad, novedad);
    
    console.log("escribano: " + this.novedad.escribano.apellido);
  }


}
