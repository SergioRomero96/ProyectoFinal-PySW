import { Pipe, PipeTransform } from '@angular/core';
import { Pago } from '../models/pago';

@Pipe({
  name: 'filterFecha'
})
export class FilterFechaPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
   // if(arg.<1)return value;
    const diaEncontrado=[];
    for(const pago of value){
      if(pago.fecha.getDate().toString().toLocaleLowerCase().indexOf(arg) >  -1){
        diaEncontrado.push(pago);
      }
    }
    return diaEncontrado;
  }
  /*validarBusqueda(pago: Pago, arg:any):boolean{
    if()
      return true;
    else
    return false;

  }*/

}
