import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService, SpinnerService, UserService } from '../../core/services';
import { FormItem } from '../../shared/components/form-controls';
import { Helpers } from '../../shared/utilities/helpers';
import { ResetPassowrdDialogs, UserInformation } from './reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  private readonly token: string = 'token';
  private readonly isUserLogIn: string = 'isUserLogIn';
  private readonly userEmail: string = 'userEmail';

  resetPasswordForm = new FormGroup({});
  newPassword: FormItem = { controlName: 'newPassword', label: 'New Password', required: true, icon: 'visibility_off' };
  confirmPassword: FormItem = { controlName: 'confirmPassword', label: 'Confirm Password', required: true, icon: 'visibility_off' };
  isNewPasswordShow: boolean = false;
  isConfirmPasswordShow: boolean = false;
  userJwtoken!: string;
  userInformation!: UserInformation;

  constructor(
    private userService: UserService,
    public router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    public spinnerService: SpinnerService ) { }

  ngOnInit(): void {
    this.userJwtoken = this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    this.setFormGroup();
    this.getDecryptedUserInformation();
  }

  getDecryptedUserInformation(): void {
    this.userInformation = this.getDecryptedJWT(this.userJwtoken);

    sessionStorage.setItem(this.userEmail, this.userInformation.given_name);
    sessionStorage.setItem(this.token, this.userJwtoken!);
    sessionStorage.setItem(this.isUserLogIn, "true");
  }

  resetPassword(): void {
    let newPassword = this.resetPasswordForm.get(this.newPassword.controlName)?.value;
    let confirmPassword = this.resetPasswordForm.get(this.confirmPassword.controlName)?.value;


    if (this.resetPasswordForm.valid) {
      let CryptoJS = require("crypto-js");
      newPassword = CryptoJS.MD5(newPassword).toString();

      this.userService.resetPassword(newPassword).subscribe(data => {
        if (data) {
          Helpers.openConfirmationDialog(this.dialog, ResetPassowrdDialogs.sent)
            .afterClosed()
            .subscribe(() => {
              this.authService.logout();
            });
        }
      });
    } else
      this.resetPasswordForm.markAllAsTouched();
  }

  showNewPassword(): void {
    this.isNewPasswordShow = !this.isNewPasswordShow;
    this.newPassword.icon = this.isNewPasswordShow ? 'visibility' : 'visibility_off';
  }

  showConfirmPassword(): void {
    this.isConfirmPasswordShow = !this.isConfirmPasswordShow;
    this.confirmPassword.icon = this.isConfirmPasswordShow ? 'visibility' : 'visibility_off';
  }

  private setFormGroup(): void {
    this.resetPasswordForm.addControl(this.newPassword.controlName, new FormControl('', Validators.required));
    this.resetPasswordForm.addControl(this.confirmPassword.controlName, new FormControl('', Validators.required));
  }

  getDecryptedJWT(jwt: string): UserInformation {
    let base64Url = jwt.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
