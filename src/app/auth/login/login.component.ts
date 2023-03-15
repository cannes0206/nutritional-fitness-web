import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AppRoutes } from '../../core/enums';
import { LoginRequest, LoginResponse } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { FormItem } from '../../shared/components/form-controls';
import { LoginFormItems } from './login-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private readonly userEmail: string = 'userEmail';
  private readonly userId: string = 'userId';
  private readonly token: string = 'token';
  private readonly isUserLogIn: string = 'isUserLogIn';

  loginForm = new FormGroup({});
  username: FormItem = LoginFormItems.username;
  password: FormItem = LoginFormItems.password;
  isShowPassword: boolean = false;
  showIncorrectCredentialMessage: boolean = false;

  forgotPasswordRoute = `auth/${AppRoutes.ForgotPassword}`;

  get userNameControl(): FormControl {
    return this.loginForm.get(this.username.controlName) as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get(this.password.controlName) as FormControl;
  }

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.setLoginFormGroup();
  }

  navigateToForgotPasswordPage(): void {
    this.router.navigateByUrl(this.forgotPasswordRoute);
  }

  onFocusInput(): void {
    this.showIncorrectCredentialMessage = false;
    this.userNameControl?.setErrors({ 'incorrectCredential': null });
    this.userNameControl?.updateValueAndValidity();
    this.passwordControl?.setErrors({ 'incorrectCredential': null });
    this.passwordControl?.updateValueAndValidity();
  }

  public onSubmit(): void {
    if (this.loginForm.valid) {
      let request = this.buildLoginRequest();
      let CryptoJS = require("crypto-js");
      request.password = CryptoJS.MD5(request.password).toString();

      this.authService.login(request)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status == 401) {
              this.showIncorrectCredentialMessage = true;
              this.userNameControl?.setErrors({ 'incorrectCredential': true }, { emitEvent: false });
              this.passwordControl?.setErrors({ 'incorrectCredential': true }, { emitEvent: false });
            }
            return throwError(() => error);
          })
        )
        .subscribe((result: LoginResponse) => {
          sessionStorage.setItem(this.isUserLogIn, 'true');
          sessionStorage.setItem(this.token, result.token!);
          sessionStorage.setItem(this.userEmail, result.user?.email!);
          sessionStorage.setItem(this.userId, result.user?.userId.toString()!);
          this.router.navigateByUrl(AppRoutes.Overview);
        });
    }
  }

  private buildLoginRequest(): LoginRequest {
    const request: LoginRequest = {
      username: this.loginForm.get(this.username.controlName)?.value,
      password: this.loginForm.get(this.password.controlName)?.value
    };

    return request;
  }

  public showPassword(): void {
    this.isShowPassword = !this.isShowPassword;
    this.password.icon = this.isShowPassword ? 'visibility' : 'visibility_off';
  }

  private setLoginFormGroup(): void {
    this.loginForm.addControl(this.username.controlName, new FormControl('', Validators.required));
    this.loginForm.addControl(this.password.controlName, new FormControl('', Validators.required));
  }
}
