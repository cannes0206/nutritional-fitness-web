import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormItem } from '../../../../shared/components/form-controls';

@Component({
  selector: 'app-phase-cycle-update-modal',
  templateUrl: './phase-cycle-update-modal.component.html',
  styleUrls: ['./phase-cycle-update-modal.component.scss']
})
export class PhaseCycleUpdateModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<string>,
    @Inject(MAT_DIALOG_DATA) public userFullName: string
  ) { }

  ngOnInit(): void {
    this.formGroup.addControl(this.formItem.controlName, new FormControl(''));
  }

  formItem: FormItem = { controlName: 'remainingDays', label: 'Remaining Days'};
  formGroup: FormGroup = new FormGroup({});

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  update(): void {
    this.dialogRef.close({ confirmed: true });
  }

}
