import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { LowerNavigation, Menu, UpperNavigation } from './menu-items';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() isLoggedIn!: boolean;
  upperNavigation: Menu = { navigation: UpperNavigation };
  lowerNavigation: Menu = { navigation: LowerNavigation };

  constructor() {
  }
  ngOnInit(): void {
  }
}
