import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';
import { Regex } from '../constants';

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

  static validDate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      const DATE_REGEX = Regex.DATE;

      return DATE_REGEX.test(control.value) && moment(control.value, 'MM/DD/YYYY', true).isValid() ?
        null : { 'invalidDate': { value: control.value } };
    }

    return null;
  }
}
