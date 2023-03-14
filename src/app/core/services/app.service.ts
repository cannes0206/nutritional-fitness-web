import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private userLoggedIn = new Subject<boolean>();

  constructor(
    private router: Router) {
    this.userLoggedIn.next(false);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {

    return this.userLoggedIn.asObservable();
  }

  logout(): void {
    this.setUserLoggedIn(false);
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
