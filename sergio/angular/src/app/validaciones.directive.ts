// import { Directive } from '@angular/core';
// import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

// function validarNegativo(n: AbstractControl) {
//     if (n.value == null) return null;
//     if (n.value < 1) {
//         return { isNegativo: true };
//     }
//     return null;
// }

// @Directive({
//     selector: '[valida-negativo]',
//     providers: [
//         { provide: NG_VALIDATORS, multi: true, useValue: validarNegativo }
//     ]
// })
// export class ValidateNegativo { }