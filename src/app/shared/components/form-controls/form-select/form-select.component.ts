import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem, FormOption } from '../form-item';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {
  @Input() formItem!: FormItem;
  @Input() formGroup!: FormGroup;
  @Input() isMultipleSelection: boolean = false;
  @Input() defaultValue: string | null = null;
  
  constructor() { }

  ngOnInit(): void {
  }

  public onSelectChange(): void {
    // Deselect placeholder
    const value = this.formGroup.get(this.formItem.controlName)?.value;
    if (this.isMultipleSelection && value) {
      const selectedOptions = value.filter((v: string) => v);
      this.formGroup.get(this.formItem.controlName)?.setValue(selectedOptions, { emitEvent: false});
    }
  }

}
