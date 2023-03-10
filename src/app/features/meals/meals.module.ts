import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import { MealSelectionModalComponent, PlannerComponent, PlannerWeekViewComponent } from './planner';

@NgModule({
  declarations: [PlannerComponent, PlannerWeekViewComponent, MealSelectionModalComponent],
  imports: [CommonModule, MealsRoutingModule, SharedModule]
})
export class MealsModule {}
