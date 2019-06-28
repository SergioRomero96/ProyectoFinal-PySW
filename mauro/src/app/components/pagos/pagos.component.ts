import { Component, OnInit } from '@angular/core';
import { Pago } from 'src/app/models/pago';
import { Escribano } from 'src/app/models/escribano';
import { LoginService } from 'src/app/services/login.service';
import { Constantes } from 'src/app/models/constantes/constantes';
import { PagoService } from 'src/app/services/pago.service';
import { EscribanoService } from 'src/app/services/escribano.service';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as printJS from 'print-js';


declare var $: any;

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent implements OnInit {
  escribanos: Array<Escribano>;
  pagos: Array<Pago>;
  pago: Pago;
  isUpdate: boolean = false;
  titulo: string;
  impPago:JSON;
  filtroFecha = '';

  constructor(public loginService: LoginService, public perfil: Constantes,
    private pagoService: PagoService, private escribanoService: EscribanoService, private toastr:ToastrService) {
    this.pago = new Pago();
    this.pagos = new Array<Pago>();
    this.obtenerPagos();
    this.obtenerEscribanos();
  }

  ngOnInit() {
  }

  public limpiar(form: FormGroup) {
    this.pago = new Pago();
    form.reset();
  }

  cambiarTituloAgregar(form: FormGroup) {
    this.limpiar(form);
    this.isUpdate = false;
    this.titulo = "Registrar pago";
    $('#pagoModal').modal({ backdrop: 'static', keyboard: false });
  }

  cambiarTituloModificar() {
    this.isUpdate = true;
    this.titulo = "Modificar pago";
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

  obtenerPagos() {
    this.pagos = new Array<Pago>();
    this.pagoService.getpagos()
      .subscribe(
        (result) => {
          /*this.pagos = result['pagos'];
          console.log(this.pagos);*/
          result['pagos'].forEach(element => {
            let e = new Pago();
            e = element;
            e.fecha = new Date(element['fecha']['timestamp']*1000);
            this.pagos.push(e);
            this.impPago = result['pagos']
          });
        }
      );
  }

  agregarPago(form: FormGroup) {
    //if (form.valid) {
    this.pagoService.addpago(this.pago)
      .subscribe(
        (result) => {
          this.toastr.success("pago registrado correctamente", this.titulo);
          this.obtenerPagos();
          $('#pagoModal').modal('hide');
        },
        error => {
          this.toastr.error("Error al registrar pago", this.titulo);
        }
      );

    this.limpiar(form);
  }
  //}


  public eliminarPago(id: number) {
    console.log("eliminar: " + id);
    this.pagoService.deletepago(id).subscribe(
      result => {
        console.log("borrado correctamente.")
        this.obtenerPagos()
        return true;
      },
      error => {
        console.error("Error al borrar!");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarPago(pago: Pago) {
    this.cambiarTituloModificar();
    //Creo una copia del escribano recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    console.log( pago.fecha);
    this.pago = Object.assign(this.pago, pago);
    //se asigna a la propiedad escribano.empresa el correspondiente en el
    //array de empresas, ya que este array es fuente de datos del <select>

    this.pago.escribano = this.escribanos.find(function (item: Escribano) {
      return item.id === pago.escribano.id;
    });
    console.log("metodo seleccionar: ");
    console.log(this.pago);
  }

  public modificarPago(form: FormGroup) {
    this.pagoService.updatepago(this.pago).subscribe(
      data => {
        this.toastr.success("Pago modificado correctamente", this.titulo);
        this.obtenerPagos();
        $('#pagoModal').modal('hide');
        return true;
      },
      error => {
        this.toastr.success("Error al modificar pago", this.titulo);
        console.log(error);
        return false;
      }
    );
    this.limpiar(form);
  }
  print(){
    printJS({printable: this.impPago, properties: ['id', 'escribano.apellido', 'escribano.nombre', 'fecha', 'importe'], type: 'json'})
   }
}
