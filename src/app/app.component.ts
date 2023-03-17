import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil, filter, Observable, of } from 'rxjs';
import { AppRoutes } from './core/enums';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private _unsubscribe: Subject<void> = new Subject<void>();
  showSidebar$ = new Observable<boolean>();

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('isUserLogIn') === 'true') {
      this.authService.setUserLoggedIn(true);
    }
    this.routerChanges();
  }

  private routerChanges(): void {
    this.router.events
      .pipe(
        filter((r) => r instanceof NavigationEnd),
        takeUntil(this._unsubscribe)
      )
      .subscribe(() => {
        this.showSidebar$ = this.authService.getUserLoggedIn();
        if (this.router.url.includes(AppRoutes.Auth)) this.showSidebar$ = of(false);
        else if (sessionStorage.getItem('isUserLogIn') === 'true') this.showSidebar$ = of(true);
      });
  }
}
