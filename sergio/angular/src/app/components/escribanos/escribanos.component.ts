import { Component, OnInit } from '@angular/core';
import { Escribania } from 'src/app/models/escribania';
import { Escribano } from 'src/app/models/escribano';
import { LoginService } from 'src/app/services/login.service';
import { EscribaniaService } from 'src/app/services/escribania.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  escribano: Escribano;

  isUpdate: boolean = false;
  titulo: string;
  cargos = ["Titular", "Adscripto"];

  constructor(public loginService: LoginService, private escribaniaService: EscribaniaService,
    private escribanoService: EscribanoService, private usuarioService: UsuarioService,
    private toastr: ToastrService) {
  
    this.escribano = new Escribano();
    this.obtenerEscribanias();
    this.obtenerEscribanos();
  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    $("#inputFoto").val(null);
    this.escribano = new Escribano();
    form.reset();
  }

  onFileChanges(files) {
    console.log("file change by method: ", files);
    this.escribano.usuario.foto = files[0].base64;
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Registrar Escribano";
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Actualizar Escribano";
  }

  obtenerEscribanias() {
    this.escribaniaService.getEscribanias()
      .subscribe(
        (result) => {
          console.log(result['escribanias']);
          this.escribanias = result['escribanias'];
        }
      );
  }

  obtenerEscribanos() {
    this.escribanos = new Array<Escribano>();
    this.escribanoService.getEscribanos()
      .subscribe(
        (result) => {
          /*result['escribanos'].forEach(element => {
            let e = new Escribano();
            e = element;
            e.fechaNacimiento = new Date(element['fechaNacimiento']['timestamp']*1000);
            this.escribanos.push(e);
          });*/
          console.log(result['escribanos']);
          this.escribanos = result['escribanos'];
        }
      );
  }

  showAgregar(){
    Swal.fire({
      title:'Agregar Escribano',
      text: 'Escribano agregado correctamente',
      type: 'success'
    });
  }

  public agregarEscribano(form: FormGroup) {
    //if (form.valid) {
    this.escribanoService.addEscribano(this.escribano)
      .subscribe(
        (result) => {
          this.showAgregar();
          this.obtenerEscribanos();
          $('#escribanoModal').modal('hide');
        },
        error => {
          alert("Error en el envio.");
        }
      );

    this.limpiar(form);
  }

  public eliminarEscribano(escribano: Escribano) {
    let id = escribano.id;
    this.escribanoService.deleteEscribano(id).then(
      result => {
        console.log("ESCRIBANO borrado correctamente.");
        //actualizo la tabla de escribanias
        this.obtenerEscribanos()
        return true;
      },
      error => {
        console.error("Escribano: Error al borrar!");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarEscribano(escribano: Escribano) {
    console.log(escribano);
    this.cambiarTituloModificar();
    console.log(escribano.fechaNacimiento);
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
    console.log(this.escribano.fechaNacimiento);
    this.escribanoService.updateEscribano(this.escribano).subscribe(
      data => {
        this.toastr.success("Se actualizo correctamente", this.titulo);
        //actualizo la tabla de escribanias
        this.obtenerEscribanos();
        $('#escribanoModal').modal('hide');
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

}
