import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { AppRoutes } from "../enums";
import { AppConfig } from "../models";
import { LoginRequest, LoginResponse } from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userEmail: string = 'userEmail';
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig,
    private router: Router
  ) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    const authUrl = this.appConfig.nutritionalFitnessApiBaseAddress + '/users/authenticate';
    return this.http.post<LoginResponse>(authUrl, request)
      .pipe(
        catchError(err => { return throwError(() => err); })
      );
  }

  getUserEmail(): string | null {
    return (sessionStorage.getItem(this.userEmail)!);
  }

  setUserLoggedIn(userLoggedIn: boolean) {
    this.loggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  logout(): void {
    this.setUserLoggedIn(false);
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
