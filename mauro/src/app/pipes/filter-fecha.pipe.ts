import { Pipe, PipeTransform } from '@angular/core';
import { Pago } from '../models/pago';

@Pipe({
  name: 'filterFecha'
})
export class FilterFechaPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
      //if(arg.lenght<0)return value;
      console.log("valor de dia" +value);
      console.log("dia por parametro: " + arg);
      if (arg && Array.isArray(value)) {
        const diaEncontrado = [];
        for (const pago of value) {
  
          if (pago.fecha.getDate().toString().indexOf(arg) > -1) {
            diaEncontrado.push(pago);  
          }
        }
        return diaEncontrado;
      } else
        return value;
    }
  }
  

