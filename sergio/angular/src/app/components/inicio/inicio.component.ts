import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { PushNotificationService } from 'ng-push-notification';
import { Escribano } from 'src/app/models/escribano';
import { Constantes } from 'src/app/models/constantes/constantes';


//     npm install ng-push-notification

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  recibido: Boolean = false;
  novedadesRecibidas: Array<Novedad>;
  novedadesEnviadas: Array<Novedad>
  escribano: Escribano;
  novedad: Novedad;
  novedades: Array<Novedad>;
  constructor(public loginService: LoginService, private pushNotification: PushNotificationService, private novedadService: NovedadService, private perfil:Constantes) {

    this.novedadesRecibidas = new Array<Novedad>();
    this.novedadesEnviadas = new Array<Novedad>();
    this.novedades = new Array<Novedad>();
    console.log("tipo de usuario:" + this.loginService.usuarioLogueado.perfil)
    if(this.loginService.usuarioLogueado.perfil == perfil.SOCIO)
      this.obtenerNovedades();
    this.showPush();

  }

  ngOnInit() {
  }

  obtenerNovedades() {
    let isRecibido = false;
    this.novedadService.getNovedadesByEscribano(this.loginService.usuarioLogueado)
      .subscribe(
        (result) => {
          //this.novedadesRecibidas = result['novedades'];
          console.log(this.novedadesRecibidas);
          result['novedades'].forEach(element => {
            let novedad = new Novedad();
            Object.assign(novedad, element);
            if (novedad.estado == "enviado") {
              isRecibido = true;
              this.novedadesRecibidas.push(novedad);
            }
            else
              this.novedadesEnviadas.push(novedad);
          });
          if(isRecibido){
            this.showAnotherPush();
          }
        }
      );
  }

  obtenerNovedades2() {
    this.novedadService.getNovedadesByEscribano(this.loginService.usuarioLogueado).subscribe(
      data => {
        this.novedades = data['novedades'];
        console.log("Las novedades son: " + this.novedades);
      }
    )

  }

  //Metodo para comprobar si el escribano tiene mensajes no leidos

  showPush() {
    Notification.requestPermission(function (result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }

    });
  }

  private async showAnotherPush() { // la función se llamará apenas el usuario acepte los permisos
    console.log("function push");
    if (this.loginService.usuarioLogueado.perfil == "socio") {
      console.log("push socio");
      if (this.novedadesRecibidas.length > 0) {
        const notification = await this.pushNotification.show('Colegio de escribanos de Jujuy', {
          body: "Tenés novedades sin leer.",
          icon: "../../../assets/imagenes/logo.jpg"
        });
        setTimeout(() => notification.close(), 6000);
        notification.onclick = function (event) { // función para enviar a una nueva ventana
          event.preventDefault(); // abre la página en una nueva ventana cuando hago click
          window.open('http://localhost/escribanosSite3/novedad-escribano', '_blank');
        }
      } else {
        console.log("tamaño" + this.novedadesRecibidas.length);
      }

    }
    else {
      console.log("El usuario no es SOCIO");
    }
  }

}

