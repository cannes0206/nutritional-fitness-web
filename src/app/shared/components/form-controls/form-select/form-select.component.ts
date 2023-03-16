import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormItem, FormOption } from '../form-item';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent {
  @Input() formItem!: FormItem;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() isMultipleSelection: boolean = false;
  @Input() defaultValue: string | null = null;
  @Output() valueChanges: EventEmitter<any> = new EventEmitter();

  get formControl(): FormControl {
    return this.formGroup.get(this.formItem.controlName) as FormControl;
  }

  constructor() {}

  onSelectChange(): void {
    // Deselect placeholder
    const value = this.formControl.value;
    if (this.isMultipleSelection && value) {
      const selectedOptions = value.filter((v: string) => v);
      this.formControl.setValue(selectedOptions, { emitEvent: false });
      this.valueChanges.emit(this.formControl.value);
    }
  }

  onSelectClose(): void {
    this.valueChanges.emit(this.formControl.value);
  }
}
