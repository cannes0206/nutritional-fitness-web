import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverviewRoutingModule } from './overview-routing.module';
import { OverviewLandingComponent } from './overview-landing/overview-landing.component';


@NgModule({
  declarations: [
    OverviewLandingComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
