import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

function isEmptyInputValue(value: any): boolean {
  return value === null || value.length === 0;
}

export class CustomValidators {
  static requiredWithTrim(control: AbstractControl): ValidationErrors | null {
    return isEmptyInputValue(control.value) || (typeof control.value === 'string' && control.value.trim() === '')
      ? { required: true }
      : null;
  }

  static dateOfBirthValidator(control: AbstractControl): ValidationErrors | null {
    const dateValue = moment(control.value, 'MM/DD/YYYY', true);

    if (!dateValue.isValid()) return null;

    return dateValue.isValid() && dateValue.isAfter(moment().subtract(120, 'years')) && dateValue.isBefore()
      ? null
      : { validateDate: { valid: false } };
  }
}
