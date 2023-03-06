import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { FormItem } from '../form-item';

@Component({
  selector: 'app-form-date-picker',
  templateUrl: './form-date-picker.component.html',
  styleUrls: ['./form-date-picker.component.scss']
})
export class FormDatePickerComponent implements OnInit {
  private defaultDateFormat = 'MM/DD/YYYY';

  @Input() formItem!: FormItem;
  @Input() formGroup!: FormGroup;
  @Output() onValueChanges:  EventEmitter<any> = new EventEmitter();

  public defaultTextMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public defaultLength = '10';
  public selectedDate = new FormControl();

  public get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  @ViewChild('picker', { static: true })
  datepicker!: MatDatepicker<Moment>;

  constructor() { }

  ngOnInit(): void {
  }

  onValueDatePickerChanges(event: MatDatepickerInputEvent<Date>, formItem: FormItem): void {
    const formattedDate = moment(event.value).format(this.formItem.dateFormat || this.defaultDateFormat);

    this.formGroup.get(formItem.controlName)?.setValue(formattedDate);
    this.onValueChanges.emit(this.formGroup.get(formItem.controlName)?.value);
  }

  onValueInputChanges(formItem: FormItem): void {
    this.onValueChanges.emit(this.formGroup.get(formItem.controlName)?.value);
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
