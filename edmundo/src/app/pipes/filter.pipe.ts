import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /*transform(value: any, arg: any): any {
    const resultado = [];
    for (const post of value) {
      //if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
      if(post.nombre.indexOf(arg) > -1){
        console.log('si');
        resultado.push(post);
      }
    }
    return resultado;
  }*/

  transform(items: any, filter: any, isAnd: boolean): any {
    if (filter && Array.isArray(items)) {
      const filterKeys = Object.keys(filter);
      console.log('sip');
      if (isAnd) {
        console.log('poco mas a dentro');
        return items.filter(item =>
          filterKeys.reduce((memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));
      } else {
        console.log('mas a dentro');
        return items.filter(item => {
          return filterKeys.some((keyName) => {
            if (filter[keyName]) {
              console.log('mas a dentrazo');
              const fil = filter[keyName].split(' ');
              let check = false;
              for (const f of fil) {
                console.log('dentro del for');
                if (new RegExp(f, 'gi').test(item[keyName]) || f === '') {
                  check = true;
                  console.log('dentro del check')
                } else {
                  check = false;
                  break;
                }
              }
              return check;
            } else {
              console.log('dentro del else');
              return true;
            }
          });
        });
      }
    } else {
      return items;
    }

  }
}

