import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeleteMealPlanConfirmationModalData {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-delete-meal-plan-confirmation',
  templateUrl: './delete-meal-plan-confirmation.component.html',
  styleUrls: ['./delete-meal-plan-confirmation.component.scss']
})
export class DeleteMealPlanConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteMealPlanConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteMealPlanConfirmationModalData
  ) {}

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  clear(): void {
    this.dialogRef.close({ confirmed: true });
  }
}
