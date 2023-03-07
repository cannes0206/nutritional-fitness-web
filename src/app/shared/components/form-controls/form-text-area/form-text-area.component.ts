import { Component, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormItem } from '../form-item';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './form-text-area.component.html',
  styleUrls: ['./form-text-area.component.scss']
})
export class FormTextAreaComponent {
  @Input() formItem!: FormItem;
  @Input() formGroup: FormGroup = new FormGroup({});

  requiredValidator = Validators.required;

  constructor() {}
}
