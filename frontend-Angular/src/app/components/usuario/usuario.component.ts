import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario;
  usuarios: Array<Usuario>;

  constructor(private usuarioService:UsuarioService, public loginService: LoginService) { 
    this.obtenerUsuarios();
  }

  ngOnInit() {
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios()
      .subscribe(
        (result) => {
          this.usuarios = result['usuarios'];
          console.log(this.usuarios);
        }
      );
  }

}
