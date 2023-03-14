import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AppService } from './core/services/app.service';
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
  isLoggedIn: boolean = false;
  private _unsubscribe: Subject<void> = new Subject<void>();

  form = new FormGroup({});
  username: FormItem = { controlName: 'username', label: 'Username', icon: 'person' };
  password: FormItem = { controlName: 'password', label: 'Password', icon: 'visibility_off' };
  dateOfBirth: FormItem = { controlName: 'dateOfBirth', label: 'Date of Birth', validationType: ValidationType.date };
  searchName: FormItem = { controlName: 'searchName', label: 'Search Name', isSearchField: true };

  constructor(public router: Router, private appService: AppService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('isUserLogIn') == 'true') {
      this.appService.setUserLoggedIn(true);
      this.isLoggedIn = true;
    } else {
      this.router.navigate(['/']);
    }
    this.routerChanges();
    this.form.addControl(this.searchName.controlName, new FormControl(''));
    this.form.addControl(this.username.controlName, new FormControl('', Validators.required));
    this.form.addControl(this.password.controlName, new FormControl('', Validators.required));
    this.form.addControl(
      this.dateOfBirth.controlName,
      new FormControl(null, [Validators.required, Validators.pattern(Regex.DATE), CustomValidators.dateOfBirthValidator])
    );
  }

  private routerChanges(): void {
    this.router.events
      .pipe(takeUntil(this._unsubscribe))
      .subscribe((r) => {
        if (r instanceof NavigationEnd) {

          if (this.router.url.includes('/sign-in'))
            this.isLoggedIn = false;
          else if (sessionStorage.getItem('isUserLogIn') == 'true')
            this.isLoggedIn = true;
        }
      });
  }
}
