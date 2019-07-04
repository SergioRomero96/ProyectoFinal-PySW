import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Constantes } from 'src/app/models/constantes/constantes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService, public perfil:Constantes) {
    console.log("header LocalStorage: " + localStorage.length);
    console.log("login: " + loginService);
    console.log("is: " + loginService.isLogueado);
    console.log("usuario: " + loginService.usuarioLogueado);
   }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('usuarioSesion');
    this.loginService.logout();
  }

}
