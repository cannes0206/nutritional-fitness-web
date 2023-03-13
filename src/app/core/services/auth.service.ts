import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AppRoutes } from "../enums";
import { AppConfig } from "../models";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly token: string = 'token';
  private readonly infoToken: string = 'infoToken';

  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) { }

  login() {
    this.loggedIn.next(true);
    this.router.navigateByUrl(`${AppRoutes.Overview}`);
  }

  logout() {
    this.loggedIn.next(false);
  }
}
