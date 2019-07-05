import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { Constantes } from 'src/app/models/constantes/constantes';
import { ToastrService } from 'ngx-toastr';
import { EscribanoService } from 'src/app/services/escribano.service';
import { Escribano } from 'src/app/models/escribano';

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
  escribanoSesion: Escribano;
  logo: boolean = false;
  isEnviado: boolean = false;
  titulo: string;

  constructor(public loginService: LoginService, private novedadService: NovedadService,
    public perfil: Constantes, private toastr: ToastrService, private escribanoService: EscribanoService) {
    this.novedad = new Novedad();
    this.escribanoSesion = new Escribano();
    this.obtenerNovedades();
    this.getEscribano();
  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    this.novedad = new Novedad();
    form.reset();
  }

  getEscribano() {
    this.escribanoService.getEscribanoByUsuario(this.loginService.usuarioLogueado)
      .subscribe(
        result => {
          var escribano = result;
          console.log(escribano);
          if (escribano.dni != '') {
            this.escribanoSesion = escribano;
          }
        },
        error => {
          console.log("error...");
          console.log(error);
        }
      );
  }

  obtenerNovedades() {

    this.novedadesEnviadas = new Array<Novedad>();
    this.novedadesRecibidas = new Array<Novedad>();
    this.novedadService.getNovedadesByEscribano(this.loginService.usuarioLogueado)
      .subscribe(
        (result) => {
          //this.novedadesRecibidas = result['novedades'];
          //console.log(this.novedadesRecibidas);
          result['novedades'].forEach(element => {
            let novedad = new Novedad();
            Object.assign(novedad, element);
            novedad.fecha = new Date(element['fecha']['timestamp'] * 1000);
            novedad.fecha.setDate(novedad.fecha.getDate() + 1);

            console.log(novedad.estado);
            if (novedad.estado === "enviado" || novedad.estado === "recibido")
              this.novedadesRecibidas.push(novedad);
            else
              this.novedadesEnviadas.push(novedad);
          });
        }
      );
    console.log(this.novedadesRecibidas);
  }

  public agregarNovedad(form: FormGroup) {
    this.novedad.estado = "no leido";
    this.novedad.escribano = this.escribanoSesion;
    this.novedadService.addNovedad(this.novedad)
      .subscribe(
        (result) => {
          this.toastr.success("mensaje enviado correctamente", this.titulo);
          this.obtenerNovedades();
          $('#novedadModal').modal('hide');
        },
        error => {
          this.toastr.error("Error al enviar mensaje", this.titulo);
        }
      );

    this.limpiar(form);
  }

  verNovedadRecibida(novedad: Novedad) {
    this.isEnviado = false;
    this.novedad = Object.assign(this.novedad, novedad);
    if (this.novedad.estado === "enviado")
      this.modificarNovedad(this.novedad);
  }

  public modificarNovedad(novedad: Novedad) {
    this.novedad.estado = "recibido";
    this.novedadService.updateNovedad(this.novedad).subscribe(
      data => {
        console.log("recibido");
        //actualizo la tabla de escribanos
        this.obtenerNovedades();
        return true;
      },
      error => {
        console.log(error);
        return false;
      }
    );
  }

  verNovedadEnviada(novedad: Novedad) {
    this.isEnviado = true;
    this.novedad = Object.assign(this.novedad, novedad)
  }


}
