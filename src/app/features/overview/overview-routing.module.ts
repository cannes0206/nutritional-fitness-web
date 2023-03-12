import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OverviewLandingComponent } from './overview-landing/overview-landing.component';

const routes: Routes = [{
  path: '',
  component: OverviewLandingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
