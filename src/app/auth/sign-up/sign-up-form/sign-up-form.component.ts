import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormItem } from '../../../shared/components/form-controls';
import { Regex } from '../../../shared/constants';
import { SignUpFormItems } from '../sign-up';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {
  signUpForm = new FormGroup({});
  name: FormItem = SignUpFormItems.personName;
  username: FormItem = SignUpFormItems.userName;
  birthDate: FormItem = SignUpFormItems.birthDate;
  gender: FormItem = SignUpFormItems.gender;
  country: FormItem = SignUpFormItems.country;
  startWeight: FormItem = SignUpFormItems.startWeight;
  weightMeasurement: FormItem = SignUpFormItems.weightMeasurement;
  startHeight: FormItem = SignUpFormItems.startHeight;
  heightMeasurement: FormItem = SignUpFormItems.heightMeasurement;
  userName: FormItem = SignUpFormItems.userName;
  email: FormItem = SignUpFormItems.email;
  confirmPassword: FormItem = SignUpFormItems.confirmPassword;
  password: FormItem = SignUpFormItems.password;

  isPasswordShow: boolean = false;
  isConfirmPasswordShow: boolean = false;
  showPasswordNotMacthedMessage: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.setSignUpFormGroup();
  }

  showPassword(): void {
    this.isPasswordShow = !this.isPasswordShow;
    this.password.icon = this.password ? 'visibility' : 'visibility_off';
  }

  showConfirmPassword(): void {
    this.isConfirmPasswordShow = !this.isConfirmPasswordShow;
    this.confirmPassword.icon = this.isConfirmPasswordShow ? 'visibility' : 'visibility_off';
  }

  onFocusInput(): void {
    this.showPasswordNotMacthedMessage = false;
  }

  signUp(): void {

  }

 private setSignUpFormGroup(): void {
    this.signUpForm.addControl(this.userName.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.confirmPassword.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.password.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.name.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.email.controlName, new FormControl('', [Validators.required, Validators.pattern(Regex.EMAIL), Validators.maxLength(128)]));
    this.signUpForm.addControl(this.birthDate.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.gender.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.country.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.startWeight.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.startHeight.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.heightMeasurement.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.weightMeasurement.controlName, new FormControl('', Validators.required));
  }

}
