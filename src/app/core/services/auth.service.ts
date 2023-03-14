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

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) { }

  login(request: LoginRequest): Observable<any> {
    const authUrl = this.appConfig.nutritionalFitnessApiBaseAddress + '/users/authenticate';
    return this.http.post<LoginResponse>(authUrl, request)
      .pipe(
        catchError(err => { return throwError(() => err); })
      );
  }

  public getUserEmail(): string | null {
    return (sessionStorage.getItem(this.userEmail)!);
  }
}
