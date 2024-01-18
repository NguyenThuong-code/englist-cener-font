import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const identityValidator: ValidatorFn= (control: AbstractControl):ValidationErrors | null =>{
  const nameFilter= control.get('nameFilter');

  // @ts-ignore
  return nameFilter.value
}
