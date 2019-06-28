import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Constantes } from './../../models/constantes/constantes';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private usuarioService: UsuarioService, public loginService: LoginService, 
    public constantes: Constantes, private toastr: ToastrService) {
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
    for (let u of this.usuarios)
      if (u.userName === this.usuario.userName)
        return true;
    return false;
  }

  public agregarUsuario(form: FormGroup) {
    //if (form.valid) {
    if (!this.validarUsuario()) {
      this.usuarioService.addUsuario(this.usuario)
        .subscribe(
          (result) => {
            this.toastr.success("Usuario agregado correctamente", this.titulo);
            this.obtenerUsuarios();
            $('#exampleModal').modal('hide');
          },
          error => {
            this.toastr.error("Error al agregar", this.titulo);
          }
        );
      this.limpiar(form);
    }
    else{
      this.toastr.error("El usuario ya esta registrado", this.titulo);
    }
  }

  public eliminarUsuario(id: number) {
    this.usuarioService.deleteUsuario(id).subscribe(
      result => {
        this.toastr.success("Se elimino correctamente", "Eliminar Usuario");
        //actualizo la tabla de usuarios
        this.obtenerUsuarios()
        return true;
      },
      error => {
        this.toastr.error("Error al borrar", "Eliminar Usuario");
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
        this.toastr.success("Usuario actualizado correctamente", this.titulo);
        //actualizo la tabla de usuarios
        this.obtenerUsuarios();
        $('#exampleModal').modal('hide');
        return true;
      },
      error => {
        this.toastr.error("Erro al actualizar", this.titulo);
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

}
