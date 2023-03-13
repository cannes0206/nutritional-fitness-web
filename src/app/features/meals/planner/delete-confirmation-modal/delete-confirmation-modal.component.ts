import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DeleteMealPlanConfirmationModalData {
  startDate: Date;
  endDate: Date;
}

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.scss']
})
export class DeleteConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteMealPlanConfirmationModalData
  ) {}

  cancel(): void {
    this.dialogRef.close({ confirmed: false });
  }

  clear(): void {
    this.dialogRef.close({ confirmed: true });
  }
}
