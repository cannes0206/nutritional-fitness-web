import { DialogModel } from "../../shared/components/dialogs/warning-dialog/dialog";

export interface UserInformation {
  programName: string;
  userName: string;
  given_name: string;
  exp: number;
  unique_name: string;
  role: string;
  nbf: number;
  nameId: string;
  iat: number;
}

export abstract class ResetPassowrdDialogs {
  static sent: DialogModel = {
    message: 'Password successfully changed!',
    title: 'Success',
    iconName: 'check_circle',
    showDialogAction: false,
    disableClose: false
  };
}

