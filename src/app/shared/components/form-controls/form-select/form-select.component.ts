import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from '../form-item';

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

  constructor() {}

  public onSelectChange(): void {
    // Deselect placeholder
    const value = this.formGroup.get(this.formItem.controlName)?.value;
    if (this.isMultipleSelection && value) {
      const selectedOptions = value.filter((v: string) => v);
      this.formGroup.get(this.formItem.controlName)?.setValue(selectedOptions, { emitEvent: false });
    }
  }
}
