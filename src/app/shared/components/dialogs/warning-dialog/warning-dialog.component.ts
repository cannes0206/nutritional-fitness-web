import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from './dialog';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {
  public dialogData: DialogModel;

  constructor(public dialogRef: MatDialogRef<WarningDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogModel) {
    this.dialogData = data;
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.dialogRef.close({ data: { proceed: true } });
  }
}
