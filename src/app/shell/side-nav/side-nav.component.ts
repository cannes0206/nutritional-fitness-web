import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { LowerNavigation, Menu, UpperNavigation } from './menu-items';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isLoggedIn$: Observable<boolean> | undefined; 

  upperNavigation: Menu = { navigation: UpperNavigation };
  lowerNavigation: Menu = { navigation: LowerNavigation };

  constructor(private router: Router, private authService: AuthService) {
  }
  isInLogInPage: boolean = false;
  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }




}
