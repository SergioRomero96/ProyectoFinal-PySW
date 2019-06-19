import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService) {
    console.log("logueado: " + loginService.isLogueado);
    console.log("logueado: " + loginService.isLogueado);
   }

  ngOnInit() {
  }

  logout() {
    //localStorage.removeItem('currentUser');
    this.loginService.logout();
  }

}
