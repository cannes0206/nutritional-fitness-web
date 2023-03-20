import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import {
  MealPlannerComponent,
  PlannerWeekViewComponent,
  MealSelectionModalComponent,
  DeleteMealPlanConfirmationComponent,
  FoodCategoryIconsComponent,
  RecipeInstructionModalComponent
} from './meal-planner';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

@NgModule({
  declarations: [
    MealPlannerComponent,
    PlannerWeekViewComponent,
    MealSelectionModalComponent,
    DeleteMealPlanConfirmationComponent,
    FoodCategoryIconsComponent,
    RecipeInstructionModalComponent,
    ShoppingListComponent
  ],
  imports: [CommonModule, MealsRoutingModule, SharedModule]
})
export class MealsModule {}
