import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { FormItem } from '../form-item';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input() formItem!: FormItem;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() controlType: 'text' | 'password' = 'text';
  @Input() floatLabel: FloatLabelType = 'always';
  @Output() valueChanges: EventEmitter<any> = new EventEmitter();
  @Output() iconClick: EventEmitter<void> = new EventEmitter();
  
  get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

  clearValue(): void {
    this.formControl.patchValue('');
  }

}
