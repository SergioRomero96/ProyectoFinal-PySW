import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { Constantes } from 'src/app/models/constantes/constantes';
import { ToastrService } from 'ngx-toastr';

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
  logo: boolean = false;
  isEnviado: boolean = false;
  titulo: string;

  constructor(public loginService: LoginService, private novedadService: NovedadService,
     public perfil: Constantes, private toastr:ToastrService) {
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

  obtenerNovedades() {
    this.novedadService.getNovedadesByEscribano(this.loginService.usuarioLogueado)
      .subscribe(
        (result) => {
          //this.novedadesRecibidas = result['novedades'];
          //console.log(this.novedadesRecibidas);
          result['novedades'].forEach(element => {
            let novedad = new Novedad();
            Object.assign(novedad, element);
            if (novedad.estado == "enviado")
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
    this.novedad.escribano = this.novedadesEnviadas[0].escribano;
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
    this.novedad.estado ="recibido";
    this.novedadService.updateNovedad(this.novedad);
    console.log("el nuevo estado es: " + this.novedad.estado);
  }

  verNovedadEnviada(novedad: Novedad) {
    this.isEnviado = true;
    this.novedad = Object.assign(this.novedad, novedad)
  }


}
