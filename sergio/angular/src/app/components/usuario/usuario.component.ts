import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Constantes } from './../../models/constantes/constantes';
import { FormGroup } from '@angular/forms';
//import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


declare var jQuery: any;
declare var $: any;


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  usuario: Usuario;
  usuarios: Array<Usuario>;
  titulo: string;
  isUpdate: boolean = false;
  foto: string;

  perfiles = [this.constantes.ADMINISTRADOR, this.constantes.ADMINISTRATIVO, this.constantes.GERENTE];

  constructor(private usuarioService: UsuarioService, public loginService: LoginService, public constantes: Constantes) {
    this.usuario = new Usuario();
    this.obtenerUsuarios();
  }

  ngOnInit() {
  }

  onFileChanges(files) {
    console.log("file change by method: ", files);
    this.usuario.foto = files[0].base64;
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Agregar Usuario";
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Modificar Usuario";
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

  validarUsuario() {
    let encontrado: boolean = false;
    for (let u of this.usuarios) {
      if (u.userName === this.usuario.userName) {
        encontrado = false;
      }
    }
  }

  public agregarUsuario(form: FormGroup) {
    //if (form.valid) {

    this.usuarioService.addUsuario(this.usuario)
      .subscribe(
        (result) => {
          alert("agregado correctamente.");
          this.obtenerUsuarios();
          $('#exampleModal').modal('hide');
        },
        error => {
          alert("Error en el envio.");
        }
      );
    this.limpiar(form);
    //}
  }

  public eliminarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        //actualizo la tabla de usuarios
        this.obtenerUsuarios()
        return true;
      },
      error => {
        console.error("Error al borrar!");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarUsuario(usuario: Usuario) {
    this.cambiarTituloModificar();
    //Creo una copia del usuario recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.usuario = Object.assign(this.usuario, usuario);
  }

  public modificarUsuario(form: FormGroup) {
    this.usuarioService.updateUsuario(this.usuario).subscribe(
      data => {
        alert("modificado correctamente.")
        //actualizo la tabla de usuarios
        this.obtenerUsuarios();
        $('#exampleModal').modal('hide');
        return true;
      },
      error => {
        console.error("Error updating!");
        console.log(error);
        return false;
      }
    );

    this.limpiar(form);
  }

  public limpiar(form: FormGroup) {
    this.usuario = new Usuario();
    form.reset();
  }

}
