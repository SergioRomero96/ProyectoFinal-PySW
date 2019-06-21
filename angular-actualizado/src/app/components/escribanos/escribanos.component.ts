import { Component, OnInit } from '@angular/core';
import { Escribania } from 'src/app/models/escribania';
import { Escribano } from 'src/app/models/escribano';
import { LoginService } from 'src/app/services/login.service';
import { EscribaniaService } from 'src/app/services/escribania.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-escribanos',
  templateUrl: './escribanos.component.html',
  styleUrls: ['./escribanos.component.css']
})
export class EscribanosComponent implements OnInit {
  escribanias: Array<Escribania>;
  escribanos: Array<Escribano>;
  usuarios: Array<Usuario>;
  escribano: Escribano;
  agrego: boolean = false;

  isUpdate: boolean = false;
  titulo: string;
  cargos = ["Titular", "Adscripto"];

  constructor(public loginService: LoginService, private escribaniaService: EscribaniaService,
    private escribanoService: EscribanoService, private usuarioService: UsuarioService) {

    this.escribano = new Escribano();
    this.obtenerEscribanias();
    this.obtenerEscribanos();
  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    this.agrego = false;
    this.escribano = new Escribano();
    form.reset();
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Registrar Escribano";
    $('#escribanoModal').modal({backdrop:'static',keyboard:false});
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Modificar Escribano";
  }

  obtenerEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        (result) => {
          this.escribanias = result['escribanias'];
          console.log("escribanias: " + this.escribanias);
        }
      );
  }

  obtenerEscribanos() {
    this.escribanoService.getEscribanos()
      .subscribe(
        (result) => {
          this.escribanos = result['escribanos'];
          console.log("escribanos: " + this.escribanos);
        }
      );
  }

  public agregarUsuario(form: FormGroup) {
    this.usuarioService.addUsuario(this.escribano.usuario)
      .subscribe(
        (result) => {
          console.log("USUARIO agregado correctamente.");     
          this.agregarEscribano(form);
        },
        error => {
          console.log("USUARIO Error en el envio.");
        }
      );
    console.log("2agrego: " + this.agrego);
  }


  public agregarEscribano(form: FormGroup) {
    //if (form.valid) {
    this.escribanoService.addEscribano(this.escribano)
      .subscribe(
        (result) => {
          alert("ESCRIBANO agregado correctamente.");
          this.obtenerEscribanos();
          $('#escribanoModal').modal('hide');
        },
        error => {
          alert("Error en el envio.");
        }
      );

    this.limpiar(form);
  }
  //}


  public eliminarEscribano(escribano: Escribano) {
    let id = escribano.id;
    this.escribanoService.deleteEscribano(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        //actualizo la tabla de escribanias
        this.obtenerEscribanos()
        return true;
      },
      error => {
        console.error("Error al borrar!");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarEscribano(escribano: Escribano) {
    this.cambiarTituloModificar();
    //Creo una copia del escribano recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    this.escribano = Object.assign(this.escribano, escribano);
    //se asigna a la propiedad escribano.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>
    this.escribano.escribania = this.escribanias.find(function (item: Escribania) {
      return item.id === escribano.escribania.id;
    });
  }

  public modificarEscribano(form: FormGroup) {
    this.escribanoService.updateEscribano(this.escribano).subscribe(
      data => {
        alert("modificado correctamente.")
        //actualizo la tabla de escribanias
        this.obtenerEscribanos();
        $('#escribanoModal').modal('hide');
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

}
