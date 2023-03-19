import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppRoutes } from '../../core/enums';
import { SpinnerService, UserService } from '../../core/services';
import { FormItem, ValidationType } from '../../shared/components/form-controls';
import { Regex } from '../../shared/constants';
import { Helpers } from '../../shared/utilities/helpers';
import { ForgotPassowrdDialogs } from './forgot-password';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm = new FormGroup({});
  email: FormItem = { controlName: 'email', label: 'Email', required: true, validationType: ValidationType.email };

  constructor(
    private router: Router,
    private userService: UserService,
    private dialog: MatDialog,
    public spinnerService: SpinnerService,
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.seForgotPasswordFormGroup();
  }

  sendEmailConfirmation(): void {
    let email = this.forgotPasswordForm.get(this.email.controlName)?.value;

    if (this.forgotPasswordForm.valid) {
      this.userService.forgotPassoword(email).subscribe(data => {
        if (data) {
          Helpers.openConfirmationDialog(this.dialog, ForgotPassowrdDialogs.sent)
            .afterClosed()
            .subscribe(() => {
              this.forgotPasswordForm.get(this.email.controlName)?.setValue('')
              this.forgotPasswordForm.markAsUntouched()
            });
        }
      });
    } else
      this.forgotPasswordForm.markAllAsTouched();

  }

  private seForgotPasswordFormGroup(): void {
    this.forgotPasswordForm.addControl(this.email.controlName, new FormControl('', [Validators.required, Validators.pattern(Regex.EMAIL), Validators.maxLength(128)]));
    this.cdref.detectChanges();
  }
}
