import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TextMaskModule } from 'angular2-text-mask';
import { MatCarouselModule } from 'ng-mat-carousel';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FileUploadModule } from 'ng2-file-upload';
import { CustomMultiselectComponent } from './components/custom-multiselect/custom-multiselect.component';
import {
  FormDatePickerComponent,
  FormInputComponent,
  FormSelectComponent,
  FormTextAreaComponent,
  FormValidationComponent
} from './components/form-controls';
import { PhotoUploaderComponent } from './components/photo-uploader/photo-uploader.component';
import { TableComponent } from './components/table/table.component';
import { AppValidationModule } from './forms/app-validation.modules';
import { FilterPipe, NoValuePipe, SafeUrlPipe } from './pipes';
import { AbsPipe } from './pipes/abs.pipe';
import { AppendMetricsPipe } from './pipes/append-metrics.pipe';
import { WarningDialogComponent } from './components/dialogs/warning-dialog/warning-dialog.component';

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
    SafeUrlPipe,
    FilterPipe,
    CustomMultiselectComponent,
    AbsPipe,
    AppendMetricsPipe,
    WarningDialogComponent
  ],
  imports: [
    CommonModule,
    AppValidationModule,
    ReactiveFormsModule,
    FormsModule,
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
    MatBadgeModule,
    MatTabsModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatProgressSpinnerModule,
    MatCheckboxModule
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
    MatBadgeModule,
    SafeUrlPipe,
    MatTabsModule,
    MatProgressBarModule,
    FilterPipe,
    MatTooltipModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    NoValuePipe,
    AbsPipe,
    AppendMetricsPipe,
    MatProgressSpinnerModule,
    CustomMultiselectComponent,
    MatCheckboxModule
  ]
})
export class SharedModule {}
