import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewLandingComponent } from './overview-landing/overview-landing.component';
import { OverviewListComponent } from './overview-list/overview-list.component';
import { OverviewMemberGainComponent } from './overview-member-gain/overview-member-gain.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    OverviewLandingComponent,
    OverviewListComponent,
    OverviewMemberGainComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    SharedModule
  ]
})
export class OverviewModule { }
