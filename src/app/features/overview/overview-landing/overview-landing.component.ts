import { Component, OnInit } from '@angular/core';
import { OverviewTabEnum } from './overview-landing';

@Component({
  selector: 'app-overview-landing',
  templateUrl: './overview-landing.component.html',
  styleUrls: ['./overview-landing.component.scss']
})
export class OverviewLandingComponent implements OnInit {

  overviewTabs = Object.values(OverviewTabEnum);
  overviewTabsEnum = OverviewTabEnum;
  currentTab: OverviewTabEnum = OverviewTabEnum.Members;

  membersCount: number = 0;
  membersGainCount: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
