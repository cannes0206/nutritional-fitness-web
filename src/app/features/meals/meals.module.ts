import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import {
  MealPlannerComponent,
  PlannerWeekViewComponent,
  MealSelectionModalComponent,
  DeleteMealPlanConfirmationComponent,
  FoodCategoryIconsComponent
} from './meal-planner';

@NgModule({
  declarations: [
    MealPlannerComponent,
    PlannerWeekViewComponent,
    MealSelectionModalComponent,
    DeleteMealPlanConfirmationComponent,
    FoodCategoryIconsComponent
  ],
  imports: [CommonModule, MealsRoutingModule, SharedModule]
})
export class MealsModule {}
