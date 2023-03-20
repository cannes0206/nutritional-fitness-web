import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormItem, ValidationType } from '../../../../shared/components/form-controls';
import { CustomValidators } from '../../../../shared/forms/custom-validators';

@Component({
  selector: 'app-reset-cycle-modal',
  templateUrl: './reset-cycle-modal.component.html',
  styleUrls: ['./reset-cycle-modal.component.scss']
})
export class ResetCycleModalComponent implements OnInit {

  dateToday: Date = new Date();
  isPriorDate: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public userFullName: string
  ) { }

  ngOnInit(): void {
    this.formGroup.addControl(this.formItem.controlName, new FormControl('', [Validators.required, CustomValidators.validDate]));
  }

  formItem: FormItem = { controlName: 'indulgeStartDate', label: 'Indulge Start Date', required: true, validationType: ValidationType.date };
  formGroup: FormGroup = new FormGroup({});

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  save(): void {
    if (this.formGroup.valid) {
      const indulgeStartDate = new Date(this.formGroup.get(this.formItem.controlName)?.value);
      if (new Date(indulgeStartDate) >= new Date(this.dateToday.toLocaleDateString()))
        this.dialogRef.close({ confirmed: true, indulgeStartDate: indulgeStartDate });
      else
        this.formGroup.setErrors({ isPriorDate: true });
    } else {
      this.formGroup.markAllAsTouched();
    }

  }

}
