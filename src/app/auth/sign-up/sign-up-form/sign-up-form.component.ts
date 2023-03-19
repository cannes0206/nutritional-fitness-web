import { FormOption } from './../../../shared/components/form-controls/form-item';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from '../../../core/models/requests/sign-up-request';
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
    this.renderOptions();

  }

  renderOptions(): void {
    var heightMeasurementOptions: FormOption[] = [
      { value: 'ft', displayName: 'ft' },
      { value: 'cm', displayName: 'cm' }
    ]
    var weightMeasurementOptions : FormOption[]= [
      { value: 'lbs', displayName: 'lbs' },
      { value: 'kg', displayName: 'kg' }
    ]

    this.heightMeasurement.option = heightMeasurementOptions;
    this.weightMeasurement.option = weightMeasurementOptions;
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
    let password = this.signUpForm.get(this.password.controlName)?.value;
    let confirmPassword = this.signUpForm.get(this.confirmPassword.controlName)?.value;
    var request = this.buildSignUpRequest();
    console.log(request);

    if (this.signUpForm.valid) {
      if (password == confirmPassword) {
        var request = this.buildSignUpRequest();
        console.log(request);
      } else
        this.showPasswordNotMacthedMessage = true;
    } else
      this.signUpForm.markAllAsTouched();
  }

  private buildSignUpRequest(): SignUpRequest {
    const request: SignUpRequest = {
      username: this.signUpForm.get(this.username.controlName)?.value,
      password: this.signUpForm.get(this.password.controlName)?.value,
      name: this.signUpForm.get(this.name.controlName)?.value,
      email: this.signUpForm.get(this.email.controlName)?.value,
      birthDate: this.signUpForm.get(this.birthDate.controlName)?.value,
      genderId: this.signUpForm.get(this.gender.controlName)?.value,
      countryId: this.signUpForm.get(this.country.controlName)?.value,
      startWeight: this.signUpForm.get(this.startWeight.controlName)?.value,
      startHeight: this.signUpForm.get(this.startHeight.controlName)?.value,
      heightMeasurement: this.signUpForm.get(this.heightMeasurement.controlName)?.value,
      weightMeasurement: this.signUpForm.get(this.weightMeasurement.controlName)?.value,
    };

    return request;
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
    this.signUpForm.addControl(this.heightMeasurement.controlName, new FormControl(''));
    this.signUpForm.addControl(this.weightMeasurement.controlName, new FormControl(''));
  }

}
