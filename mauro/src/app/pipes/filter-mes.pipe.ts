import { Pipe, PipeTransform } from '@angular/core';
import { Pago } from '../models/pago';

@Pipe({
  name: 'filterMes'
})
export class FilterMesPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    console.log("mes por parametro: " + arg);
    if (arg && Array.isArray(value)) {
      const mesEncontrado = [];
      console.log("mes por parametro: " + arg);
      for (const pont of value) {
        if (this.validarBusqueda(pont, arg)) {
          mesEncontrado.push(pont);
        }
      }
      return mesEncontrado;
    } else
      return value;
  }

  validarBusqueda(pago: Pago, arg?: any): boolean {
    if ((pago.fecha.getMonth() + 1).toString().indexOf(arg) > -1) {
      console.log("mes : " + (pago.fecha.getMonth() + 1));
      return true;
    } else
      return false;

  }
}
