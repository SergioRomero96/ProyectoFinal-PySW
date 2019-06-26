import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultado = [];
    for (const post of value) {
      //if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
      if(post.nombre.indexOf(arg) > -1){
        console.log('si');
        resultado.push(post);
      }
    }
    return resultado;
  }
}
