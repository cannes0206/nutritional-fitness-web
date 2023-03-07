import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormItem, ValidationType } from './shared/components/form-controls';
import { Regex } from './shared/constants';
import { CustomValidators } from './shared/forms/custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NutritionalFitnessWeb';

  form = new FormGroup({});
  username: FormItem = { controlName: 'username', label: 'Username', icon: 'person' };
  password: FormItem = { controlName: 'password', label: 'Password', icon: 'visibility_off' };
  dateOfBirth: FormItem = { controlName: 'dateOfBirth', label: 'Date of Birth', validationType: ValidationType.date };
  searchName: FormItem = { controlName: 'searchName', label: 'Search Name', isSearchField: true };

  ngOnInit(): void {
    this.form.addControl(this.searchName.controlName, new FormControl(''));
    this.form.addControl(this.username.controlName, new FormControl('', Validators.required));
    this.form.addControl(this.password.controlName, new FormControl('', Validators.required));
    this.form.addControl(
      this.dateOfBirth.controlName,
      new FormControl(null, [Validators.required, Validators.pattern(Regex.DATE), CustomValidators.dateOfBirthValidator])
    );
  }
}
