import { StatusActionEnum } from "../../../../core/enums/status-action-enum";

export interface DialogModel {
  message: string;
  title: string;
  iconName?: string;
  showAction?: boolean;
  disableClose?: boolean;
  showDialogAction?: boolean;
  action?: StatusActionEnum;
  hasSecondaryMessage?: boolean;
  secondaryMessage?: string;
}
