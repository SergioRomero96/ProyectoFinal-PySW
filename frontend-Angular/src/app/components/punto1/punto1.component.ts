import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/models/mensaje';
import { FormGroup } from '@angular/forms';
import { Empresa } from 'src/app/models/empresa';
import { MensajeService } from 'src/app/services/mensaje.service';
import * as jsPDF from 'jspdf';
import html2canvas from  'html2canvas'
@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component implements OnInit {
  mensaje: Mensaje;
  //tamMaxTexto: number = 20;
  tamTexto: number;
  tamMaxText: number = 120;
  tamText: number = 120;
  restText: number;
  text: String;
  mensajes: Array<Mensaje>;
  empresas: Array<Empresa>;
  submitted: boolean = false;

  constructor(private mensajeService: MensajeService) {
    this.mensaje = new Mensaje();
    this.mensajes = new Array<Mensaje>();
    this.empresas = new Array<Empresa>();
    this.obtenerEmrpesas();
    this.mostrarHistoricos();
    this.enviarMensaje();
  }



  ngOnInit() { }

  reporteTablaPdf() {
  
    var id = document.getElementById("tabMensaje");
    var pdf = new jsPDF({
      orientation: 'l',
      unit: 'pt',
      format: 'libro mayor',
      presicion: 2
    });
  
    //pdf.rect(5,5,100,100);
    pdf.setFillColor(150);
    pdf.setFontSize(22);
    pdf.text('LISTADO DE MENSAJE',180, 20);
    pdf.fromHTML(id, 100, 40,{
      'width': 280
    });
   
   
   // pdf.autoPrint();
    pdf.save("Mensaje.pdf");
    
  }



  public cambiarTamTexto() {
    this.tamTexto = this.tamMaxText - this.mensaje.texto.length;
    console.log(this.tamTexto);
  }
  mostrar(form: FormGroup) {
    this.submitted = true;
  }

  public mostrarHistoricos() {
    //llamamos al metodo del service     
    //para cargar los mensajes     
    this.mensajeService.getMensajes()
      .subscribe(
        result => {
          this.mensajes = result;
          console.log(this.mensaje);
          console.log("entro");

        },
        error => {
          alert("error en la peticion");
        });
  }

  public obtenerEmrpesas() {
    this.mensajeService.getEmpresas()
      .subscribe(
        results => {
          this.empresas = results['empresas'];
          console.log(this.empresas);
        });
  }


  /* public enviarMensaje() {
     this.mensaje.fecha = new Date();
     this.mensajes.push(this.mensaje);
     this.mensaje = new Mensaje();
   }*/

  public enviarMensaje() {
    this.mensaje.fecha = new Date();
    this.mensajeService.sendMensaje(this.mensaje)
      .subscribe(
        result => {
          console.log("agregado correctamente.");
          this.mostrarHistoricos();
          alert("el mensaje se envio exitosamnete");
        },
        error => {
          // alert("Error en el envio.");
        });
    this.borrarCampo();
  }
  /*mensaje: Mensaje;
  tamMaxText: number = 120;
  tamText: number=120; 
  restText: number ;
  text : String;
  mensajes: Array<Mensaje>;

  constructor() { 
  //  this.restText = this.tamMaxText;
    this.mensaje = new Mensaje();
    this.mensajes = new Array<Mensaje>();

  }

  ngOnInit() {
  }*/

  public cantidadDeCaracter() {

    // this.tamText = this.mensaje.texto.length;
    // this.restText=this.tamMaxText;
    if (this.tamText <= this.tamMaxText) {
      this.tamText = this.tamMaxText - this.mensaje.texto.length;
    }

    console.log(this.tamText)
  }

  /* public enviarMensaje(){
     this.mensajes.push(this.mensaje);
     console.log(this.mensaje.desde)
     console.log(this.mensaje.para);
     console.log(this.mensaje.texto)
     
   }*/

  public borrarCampo() {
    console.log("TE entro");
    this.mensaje = new Mensaje();
    this.tamMaxText = 120;


  }


}
