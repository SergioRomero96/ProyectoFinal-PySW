import { Component, OnInit } from '@angular/core';

//AGREGADO
import { Usuario } from 'src/app/models/usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
//AGREGADO

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm: Usuario = new Usuario();
  returnUrl: string;
  msgLogin: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/inicio';
  }

  login() {
    this.loginService.login(this.userForm.userName, this.userForm.password)
      .subscribe(
        data => {
          var user = data;
          console.log(user);
          if (user.userName != '') {
            //vbles para mostrar-ocultar cosas en el header
            
            //localstorage usado para mostrar o no un componente
            localStorage.setItem('usuarioSesion', JSON.stringify(user));
            this.loginService.isLogueado = localStorage.length != 0;
            this.loginService.usuarioLogueado =  JSON.parse(localStorage.getItem('usuarioSesion'));
            this.router.navigateByUrl(this.returnUrl);
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msgLogin = "Credenciales incorrectas..";
          }
        },
        error => {
          console.log("error...");
          console.log(error);
        }
      );
  }

}
