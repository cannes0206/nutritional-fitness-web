import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FormItem } from '../form-item';

@Component({
  selector: 'app-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.scss']
})
export class FormDatePickerComponent {
  private defaultDateFormat = 'MM/DD/YYYY';

  @Input() formItem!: FormItem;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Output() valueChanges: EventEmitter<any> = new EventEmitter();

  defaultTextMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  selectedDate = new FormControl();

  get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  @ViewChild('picker', { static: true })
  datepicker!: MatDatepicker<Moment>;

  constructor() {}

  onValueDatePickerChanges(event: MatDatepickerInputEvent<Date>): void {
    const formattedDate = moment(event.value).format(this.formItem.dateFormat || this.defaultDateFormat);

    this.formControl.setValue(formattedDate);
    this.valueChanges.emit(this.formControl.value);
  }

  onValueInputChanges(): void {
    this.valueChanges.emit(this.formControl.value);
  }

  open(): void {
    const dateValue = moment(this.formControl.value, this.formItem.dateFormat || this.defaultDateFormat);
    const month = dateValue.month();
    const year = dateValue.year();
    const day = dateValue.date();
    this.selectedDate.setValue(new Date(year, month, day), { emitEvent: false });
    this.datepicker.open();
  }
}
