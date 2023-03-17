import { DialogModel } from "../../shared/components/dialogs/warning-dialog/dialog";

export abstract class ForgotPassowrdDialogs {
  static sent: DialogModel = {
      message: 'Email confirmation successfully sent!',
      title: 'Sent',
      iconName: 'check_circle',
      showDialogAction: false,
      disableClose: false
  };
}
