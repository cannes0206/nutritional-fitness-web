import { TextFieldModule } from '@angular/cdk/text-field';
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
import { MatButtonModule } from '@angular/material/button';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatBadgeModule } from '@angular/material/badge';

import {
  FormDatePickerComponent,
  FormInputComponent,
  FormSelectComponent,
  FormTextAreaComponent,
  FormValidationComponent
} from './components/form-controls';
import { TableComponent } from './components/table/table.component';
import { AppValidationModule } from './forms/app-validation.modules';
import { NoValuePipe } from './pipes';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { FileUploadModule } from 'ng2-file-upload';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    FormInputComponent,
    FormSelectComponent,
    FormValidationComponent,
    FormDatePickerComponent,
    TableComponent,
    NoValuePipe,
    FormTextAreaComponent,
    PhotoUploaderComponent,
    SafeUrlPipe
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
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    TextFieldModule,
    FileUploadModule,
    MatButtonModule,
    MatCarouselModule.forRoot(),
    MatBadgeModule
    
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
    MatSortModule,
    TextFieldModule,
    FormTextAreaComponent,
    PhotoUploaderComponent,
    SafeUrlPipe,
    MatButtonModule,
    MatCarouselModule,
    MatBadgeModule
  ]
})
export class SharedModule {}
