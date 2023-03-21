import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormItem } from '../../../../shared/components/form-controls';

export interface PhaseCycleUpdateModalData {
  userFullName: string;
  currentPhase: string;
}

@Component({
  selector: 'app-phase-cycle-update-modal',
  templateUrl: './phase-cycle-update-modal.component.html',
  styleUrls: ['./phase-cycle-update-modal.component.scss']
})
export class PhaseCycleUpdateModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public data: PhaseCycleUpdateModalData
  ) { }

  ngOnInit(): void {
    this.formGroup.addControl(this.formItem.controlName, new FormControl('', Validators.required));
  }

  formItem: FormItem = { controlName: 'remainingDays', label: 'Remaining Days', required: true };
  formGroup: FormGroup = new FormGroup({});

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  update(): void {
    if (this.formGroup.valid) {
      var remainingDays = this.formGroup.get(this.formItem.controlName)?.value;
      this.dialogRef.close({ confirmed: true, remainingDays: remainingDays });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
