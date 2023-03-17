import { MatDialog } from '@angular/material/dialog';
import { FormOption } from 'src/app/shared/components/form-controls';
import { DialogModel } from '../components/dialogs/warning-dialog/dialog';
import { WarningDialogComponent } from '../components/dialogs/warning-dialog/warning-dialog.component';

export class Helpers {
  public static setFormOptions<T, Key extends keyof T>(
    response: T[],
    valueName: Key,
    displayName: Key,
    placeHolder?: string
  ): FormOption[] | [] {
    if (response.length === 0) return [];

    const options: FormOption[] = [];

    if (placeHolder) {
      options.push({
        value: 0,
        displayName: placeHolder
      });
    }

    response.forEach((r: T) => {
      options.push({
        value: r[valueName],
        displayName: String(r[displayName])
      });
    });

    return options;
  }

  public static openConfirmationDialog(dialog: MatDialog, data: DialogModel) {
    const dialogRef = dialog.open(WarningDialogComponent, {
      disableClose: data.disableClose,
      autoFocus: false,
      position: { top: '50px' },
      data: data
    });

    return dialogRef;
  }
}
