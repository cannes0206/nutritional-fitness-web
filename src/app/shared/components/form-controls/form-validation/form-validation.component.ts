import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ErrorMessage } from 'src/app/shared/constants';
import { FormItem, ValidationType } from '../form-item';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.scss']
})
export class FormValidationComponent implements OnInit {
  private defaultDateFormat = 'MM/DD/YYYY';

  @Input() formItem!: FormItem;

  @Input() formGroup: FormGroup = new FormGroup({});

  errorMessages = ErrorMessage;
  validationTypes = ValidationType;

  
  constructor() { }

  ngOnInit(): void {
  }

}
