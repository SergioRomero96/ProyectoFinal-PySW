
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { Directive, Input } from "@angular/core";


@Directive({
  selector: "[controlNumeros]",
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: controlDeNumeros,
      multi: true
  }]
})
export class controlDeNumeros implements Validator {
  validate(c: AbstractControl): { [key: string]: any; } {


    if (c.value < 0) return { "negativo": true };


  }
  registerOnValidatorChange?(fn: () => void): void {
      throw new Error("Method not implemented.");
  }
}
