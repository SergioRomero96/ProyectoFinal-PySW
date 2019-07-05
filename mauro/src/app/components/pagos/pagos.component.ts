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
import Swal from 'sweetalert2';


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
  impPago: JSON;
  filtroFecha = '';

  constructor(public loginService: LoginService, public perfil: Constantes,
    private pagoService: PagoService, private escribanoService: EscribanoService, private toastr: ToastrService) {
    this.pago = new Pago();
    this.pagos = new Array<Pago>();
    this.obtenerPagos();
    this.obtenerEscribanos();
  }

  ngOnInit() {
  }

  meses = [
    {
      "codigo": "1",
      "descripcion": "Enero"
    }, {
      "codigo": "2",
      "descripcion": "Febrero"
    }, {
      "codigo": "3",
      "descripcion": "Marzo"
    }, {
      "codigo": "4",
      "descripcion": "Abril"
    }, {
      "codigo": "5",
      "descripcion": "Mayo"
    }, {
      "codigo": "6",
      "descripcion": "Junio"
    }, {
      "codigo": "7",
      "descripcion": "Julio"
    }, {
      "codigo": "8",
      "descripcion": "Agosto"
    }, {
      "codigo": "9",
      "descripcion": "Septiembre"
    }, {
      "codigo": "10",
      "descripcion": "Octubre"
    }, {
      "codigo": "11",
      "descripcion": "Noviembre"
    }, {
      "codigo": "12",
      "descripcion": "Diciembre"
    }
  ];

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
            e.fecha = new Date(element['fecha']['timestamp'] * 1000);
            e.fecha.setDate(e.fecha.getDate()+1);
            this.pagos.push(e);
            this.impPago = result['pagos']
          });
        }
      );
  }

  agregarPago(form: FormGroup) {
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

  confirmarEliminar(id: number) {
    Swal.fire({
      title: 'Desea cancelar el pago registrado?',
      text: 'Se va a cancelar el pago con ID: ' + id,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.eliminarPago(id);
      }
    })
  }

  public eliminarPago(id: number) {
    console.log("eliminar: " + id);
    this.pagoService.deletepago(id).subscribe(
      result => {
        this.toastr.success("pago cancelado correctamente", "Cancelar Pago");
        this.obtenerPagos()
        return true;
      },
      error => {
        this.toastr.success("Error al cancelar el pago", "Cancelar Pago");
        console.log(error);
        return false;
      }
    )
  }

  public seleccionarPago(pago: Pago) {
    this.cambiarTituloModificar();
    //Creo una copia del pago recibido como parametro para NO modificarlo
    //ya que el parametro esta mostrandose por el binding en el datatable
    console.log(pago.fecha);
    this.pago = Object.assign(this.pago, pago);
    //se asigna a la propiedad pago.escribano el correspondiente en el
    //array de escribanos, ya que este array es fuente de datos del <select>

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

    printJS({
      printable: this.impPago,

      header: '<h3> <img class="img-fluid" width="900" src="../../../assets/imagenes/logo2.jpg"  /></h3>',
      style: '.custom-h3 { color: red; }' ,
      gridHeaderStyle: 'color: red;  border: 2px solid #3971A5; background: #333333;',
      gridStyle: 'border: 2px solid #3971A5;',
    properties: ['id', 'escribano.apellido', 'escribano.nombre', 'fecha', 'importe'],
     type: 'json'})
   }
}
