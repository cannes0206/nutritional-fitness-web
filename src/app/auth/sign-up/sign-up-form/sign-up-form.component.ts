import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginResponse } from '../../../core/models/auth.model';
import { SignUpRequest } from '../../../core/models/requests/sign-up-request';
import { UserService } from '../../../core/services';
import { CountryService } from '../../../core/services/country.service';
import { FormItem } from '../../../shared/components/form-controls';
import { Regex } from '../../../shared/constants';
import { SignUpFormItems } from '../sign-up';
import { FormOption } from './../../../shared/components/form-controls/form-item';

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
  countryOptions!: FormOption[];

  isPasswordShow: boolean = false;
  isConfirmPasswordShow: boolean = false;
  showPasswordNotMacthedMessage: boolean = false;

  constructor(
    private countryService: CountryService,
    private cdref: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setSignUpFormGroup();
    this.renderOptions();
  }

  renderOptions(): void {
    this.renderMeasurementOptions();
    this.renderCountryOptions();
    this.renderGenderOptions();
    this.cdref.detectChanges();
  }

  renderMeasurementOptions(): void {
    const heightMeasurementOptions: FormOption[] = [
      { value: 'ft', displayName: 'ft' },
      { value: 'cm', displayName: 'cm' }
    ];
    const weightMeasurementOptions: FormOption[] = [
      { value: 'lbs', displayName: 'lbs' },
      { value: 'kg', displayName: 'kg' }
    ];
    this.heightMeasurement.option = heightMeasurementOptions;
    this.weightMeasurement.option = weightMeasurementOptions;
  }

  renderCountryOptions(): void {
    this.countryService.getListOfCountry().subscribe((data) => {
      const options: FormOption[] = data.map((z, index) => ({
        value: index,
        displayName: `${z.countryName}`
      }));
      this.country.option = options;
    });
  }

  renderGenderOptions(): void {
    const genderOptions: FormOption[] = [
      { value: 1, displayName: 'Male' },
      { value: 2, displayName: 'Female' },
      { value: 3, displayName: 'Preder not to say' }
    ];

    this.gender.option = genderOptions;
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
    const password = this.signUpForm.get(this.password.controlName)?.value;
    const confirmPassword = this.signUpForm.get(this.confirmPassword.controlName)?.value;

    if (this.signUpForm.valid) {
      if (password === confirmPassword) {
        const CryptoJS = require('crypto-js');
        const request = this.buildSignUpRequest();
        request.password = CryptoJS.MD5(request.password).toString();

        this.userService
          .registerBasicUser(request)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {
                console.log(error.status);
              }
              return throwError(() => error);
            })
          )
          .subscribe((result: LoginResponse) => {
            if (result) this.router.navigateByUrl('/');
          });
      } else this.showPasswordNotMacthedMessage = true;
    } else this.signUpForm.markAllAsTouched();
  }

  private buildSignUpRequest(): SignUpRequest {
    const request: SignUpRequest = {
      username: this.signUpForm.get(this.username.controlName)?.value,
      password: this.signUpForm.get(this.password.controlName)?.value,
      name: this.signUpForm.get(this.name.controlName)?.value,
      email: this.signUpForm.get(this.email.controlName)?.value,
      birthDate: new Date(this.signUpForm.get(this.birthDate.controlName)?.value),
      genderId: this.signUpForm.get(this.gender.controlName)?.value,
      countryId: this.signUpForm.get(this.country.controlName)?.value,
      startWeight: Number(this.signUpForm.get(this.startWeight.controlName)?.value),
      startHeight: Number(this.signUpForm.get(this.startHeight.controlName)?.value),
      heightMeasurement: this.signUpForm.get(this.heightMeasurement.controlName)?.value,
      weightMeasurement: this.signUpForm.get(this.weightMeasurement.controlName)?.value
    };

    return request;
  }

  private setSignUpFormGroup(): void {
    this.signUpForm.addControl(this.userName.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.confirmPassword.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.password.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.name.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(
      this.email.controlName,
      new FormControl('', [Validators.required, Validators.pattern(Regex.EMAIL), Validators.maxLength(128)])
    );
    this.signUpForm.addControl(this.birthDate.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.gender.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.country.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.startWeight.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.startHeight.controlName, new FormControl('', Validators.required));
    this.signUpForm.addControl(this.heightMeasurement.controlName, new FormControl('ft'));
    this.signUpForm.addControl(this.weightMeasurement.controlName, new FormControl('lbs'));
    this.cdref.detectChanges();
  }
}
