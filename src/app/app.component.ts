import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil, filter } from 'rxjs';
import { AppRoutes } from './core/enums';
import { AuthService } from './core/services';
import { FormItem } from './shared/components/form-controls';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _unsubscribe: Subject<void> = new Subject<void>();
  isLoggedIn: boolean = false;

  form = new FormGroup({});
  username: FormItem = { controlName: 'username', label: 'Username', icon: 'person' };
  password: FormItem = { controlName: 'password', label: 'Password', icon: 'visibility_off' };

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('isUserLogIn') === 'true') {
      this.authService.setUserLoggedIn(true);
      this.isLoggedIn = true;
    }
    this.routerChanges();
    this.form.addControl(this.username.controlName, new FormControl('', Validators.required));
    this.form.addControl(this.password.controlName, new FormControl('', Validators.required));
  }

  private routerChanges(): void {
    this.router.events
      .pipe(
        filter((r) => r instanceof NavigationEnd),
        takeUntil(this._unsubscribe)
      )
      .subscribe(() => {
        if (this.router.url.includes('/sign-in') || this.router.url.includes(AppRoutes.ForgotPassword)) this.isLoggedIn = false;
        else if (sessionStorage.getItem('isUserLogIn') === 'true') this.isLoggedIn = true;
      });
  }
}
