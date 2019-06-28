import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMes'
})
export class FilterMesPipe implements PipeTransform {

  transform(value: any, arg?: any): any {
    // if(arg.<1)return value;
     const mesEncontrado=[];
     for(const pago of value){
       if(pago.fecha.getDate().toString().toLocaleLowerCase().indexOf(arg.toString().toLocaleLowerCase()) >  -1){
         mesEncontrado.push(pago);
       }
     }
     return mesEncontrado;
    }
}
