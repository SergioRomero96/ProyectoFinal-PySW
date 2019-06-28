import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPago'
})
export class FilterPagoPipe implements PipeTransform {
  transform(value: any, arg: any): any {
    const resultado = [];
    for (const post of value) {
      if (post.escribano.apellido.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        //if(post.nombre.indexOf(arg) > -1){
        console.log('si');
        resultado.push(post);
        console.log(resultado);
      }
    }
    return resultado;
  }
}
