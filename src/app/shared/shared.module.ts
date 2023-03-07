import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { TextMaskModule } from 'angular2-text-mask';
import { FormDatePickerComponent, FormInputComponent, FormSelectComponent, FormValidationComponent } from './components/form-controls';
import { TableComponent } from './components/table/table.component';
import { AppValidationModule } from './forms/app-validation.modules';
import { NoValuePipe } from './pipes';

@NgModule({
  declarations: [FormInputComponent, FormSelectComponent, FormValidationComponent, FormDatePickerComponent, TableComponent, NoValuePipe],
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
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    ReactiveFormsModule,
    FormDatePickerComponent,
    FormInputComponent,
    FormSelectComponent,
    FormValidationComponent,
    TableComponent,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class SharedModule {}
