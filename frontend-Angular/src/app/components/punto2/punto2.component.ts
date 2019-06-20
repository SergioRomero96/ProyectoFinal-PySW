import { Component, OnInit } from '@angular/core';
import {Convertir} from './../../models/convertir';
import {Precio} from './../../models/precio';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css']
})
export class Punto2Component implements OnInit {

  cambio: Convertir;
  cambios: Array<Convertir>;
  dolar: Precio;
  monto: number;
  moneda: String;
  valorDolar: number=0;
  valorPesos: number=0;
  submitted: boolean=false;

  constructor() { 
    this.cambio = new Convertir();
    this.dolar = new Precio();
    this.cambios = new Array<Convertir>();
  }
  mostrar(form: FormGroup){
    this.submitted = true;
  }
  registrarCambio() {
    this.cambios.push(this.cambio);
    console.log("usted esta aqui");

  }

  ngOnInit() {
  }

  public cambiar(){
    if (this.cambio.dolar == true){
      this.pesoDolar();
      this.cambio.valor = "Pesos - Dolar"; 
      this.moneda=" Ud cambio de Pesos a Dolares :";
    }
    else{
      if(this.cambio.peso == true){
        this.dolarPeso();
        this.cambio.valor = "Dolar - Pesos"
        this.moneda="Ud a cambiado de Dolar a Pesos :";
      }
     
    }
    
  }

  public actualizar(){
    this.cambio = new Convertir();
  }

  public pesoDolar(){
    this.valorDolar = this.valorDolar+1;
    this.cambio.precio = this.cambio.cantidad*this.dolar.compraDolar;

    console.log(this.monto);
    
  }

  public dolarPeso(){
    this.valorPesos = this.valorPesos+1;
    this.cambio.precio=this.cambio.cantidad/this.dolar.ventaDolar;
    console.log(this.monto);
   
  }



  public nuevo(){
    
    this.cambio.cantidad=null;
    this.cambio.dolar=false;
    this.cambio.peso=false;
  }

  public reiniciar(){
    this.monto = 0;
    this.cambio = new Convertir();
    this.dolar = new Precio();
    this.cambios = new Array<Convertir>();
   
  }

  
  

}
