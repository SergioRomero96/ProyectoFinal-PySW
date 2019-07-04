import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPago'
})
export class FilterPagoPipe implements PipeTransform {
  transform(value: any, arg?: any): any {
    console.log("escribano por parametro: " + arg);
    if (arg && Array.isArray(value)) {
      const resultado = [];
      for (const post of value) {
         if (post.escribano.apellido.toLocaleLowerCase().indexOf(arg) > -1) {
        //if (post.escribano.dni.toLocaleLowerCase().indexOf(arg) > -1) {
          //if(post.nombre.indexOf(arg) > -1){
          console.log('si');
          resultado.push(post);
          console.log(resultado);
        }
      }
      return resultado;
    } else
      return value;
  }
}
