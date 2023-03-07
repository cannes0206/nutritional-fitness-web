import { NgModule } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@NgModule({})
export class AppValidationModule {
  constructor() {
    Validators.required = CustomValidators.requiredWithTrim;
  }
}
