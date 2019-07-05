import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Constantes } from 'src/app/models/constantes/constantes';

declare var $;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  titulo:string;

  constructor(public loginService: LoginService, public perfil: Constantes,
     private usuarioService:UsuarioService, private toastr:ToastrService) { 
      this.usuario = new Usuario();
    this.titulo = "Actualizar Perfil";
  }

  ngOnInit() {
  }

  getUsuario(){
    if(this.loginService.usuarioLogueado !=null){
      this.usuario = this.loginService.usuarioLogueado;
      console.log(this.usuario.userName)
    }
  }

  onFileChanges(files) {
    console.log("file change by method: ", files);
    this.usuario.foto = files[0].base64;
  }

  public modificarUsuario(form: FormGroup) {
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      data => {
        this.toastr.success("Perfil actualizado correctamente", this.titulo);
        localStorage.removeItem('usuarioSesion');
        localStorage.setItem('usuarioSesion', JSON.stringify(this.usuario));
        $('#exampleModal').modal('hide');
        return true;
      },
      error => {
        this.toastr.error("Error al actualizar", this.titulo);
        console.log(error);
        return false;
      }
    );

    this.limpiar(form);
  }

  public limpiar(form: FormGroup) {
    this.usuario = new Usuario();
    $("#inputFoto").val(null);
    form.reset();
  }



  logout() {
    localStorage.removeItem('usuarioSesion');
    this.loginService.logout();
  }

}
