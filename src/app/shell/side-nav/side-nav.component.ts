import { Component, Input } from '@angular/core';
import { LowerNavigations, Menu, UpperNavigations } from './menu-items';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input() showSidebar$: any;

  upperNavigation: Menu = { navigation: UpperNavigations };
  lowerNavigation: Menu = { navigation: LowerNavigations };

  constructor() { }
}
