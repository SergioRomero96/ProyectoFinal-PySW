import { Component, OnInit } from '@angular/core';
import { Novedad } from 'src/app/models/novedad';
import { LoginService } from 'src/app/services/login.service';
import { NovedadService } from 'src/app/services/novedad.service';
import { PushNotificationService } from 'ng-push-notification';


//     npm install ng-push-notification

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  novedadesRecibidas: Array<Novedad>;
  novedadesEnviadas: Array<Novedad>

  constructor(public loginService: LoginService, private pushNotification: PushNotificationService,private  novedadService: NovedadService) {
    console.log("home LocalStorage: " + localStorage.length);
    console.log("usuarioLogueado: " + loginService.usuarioLogueado);
    this.notificacionParaUsuarios();
    this.novedadesRecibidas = new Array<Novedad>();
    this.novedadesEnviadas = new Array<Novedad>();
    this.obtenerNovedades();
   }

  ngOnInit() {
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
      console.log(this.novedadesEnviadas);
  }


  notificacionParaUsuarios(){
    console.log("El login service usuario es: "+this.loginService.isLogueado);
    console.log("El login service usuario es: "+this.loginService.usuarioLogueado.perfil);
   if (this.loginService.usuarioLogueado.perfil == "socio"  ){
    //  for(let n of this.novedadesEnviadas){
    //    if(n.estado == "leido"){
    //      var bandera = true; break;
    //    }
    //  }
    //  if(bandera){}
      this.showPush()
      this.showAnotherPush();


   }
   else{
     console.log("El usuario no es SOCIO");
   }
  }


  showPush() {
    Notification.requestPermission(function(result) {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      } else if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }
      this.showAnotherPush();
    });


  }

 private async showAnotherPush() { // la función se llamará apenas el usuario acepte los permisos
  const notification = await this.pushNotification.show('Colegio de escribanos de Jujuy',{
  body: "Tenés nuevas notificaciones",
  icon: "../../../assets/imagenes/logo.jpg" } );
  setTimeout(() => notification.close(), 6000);
  notification.onclick = function(event) { // función para enviar a una nueva ventana
   event.preventDefault(); // abre la página en una nueva ventana cuando hago click
   window.open('http://localhost/escribanosSite2/novedad-escribano', '_blank');
 }

}
}

