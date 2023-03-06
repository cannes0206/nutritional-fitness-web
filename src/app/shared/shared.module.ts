import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TextMaskModule } from 'angular2-text-mask';
import { FormDatePickerComponent, FormInputComponent, FormSelectComponent, FormValidationComponent } from './components/form-controls';
import { MatNativeDateModule } from '@angular/material/core';
import { AppValidationModule } from './forms/app-validation.modules';

@NgModule({
  declarations: [
    FormInputComponent,
    FormSelectComponent,
    FormValidationComponent,
    FormDatePickerComponent
  ],
  imports: [
    CommonModule,
    AppValidationModule,
    ReactiveFormsModule,
    TextMaskModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    ReactiveFormsModule,
    FormDatePickerComponent,
    FormInputComponent,
    FormSelectComponent,
    FormValidationComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class SharedModule { }
