import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../core/models/auth.model';
import { AuthService } from '../../core/services/auth.service';
import { FormItem } from '../../shared/components/form-controls';
import { LoginFormItems } from './login-models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({});
  public username: FormItem = LoginFormItems.username;
  public password: FormItem = LoginFormItems.password;
  public isShowPassword: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.setLoginFormGroup();
  }

  public onSubmit(): void {
    let request = this.buildLoginRequest();
    let CryptoJS = require("crypto-js");
    request.password = CryptoJS.MD5(request.password).toString();
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
