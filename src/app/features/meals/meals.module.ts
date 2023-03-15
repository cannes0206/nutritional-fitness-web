import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import { MealSelectionModalComponent, PlannerComponent, PlannerWeekViewComponent } from './planner';
import { DeleteConfirmationModalComponent } from './planner/delete-confirmation-modal/delete-confirmation-modal.component';
import { FoodCategoryIconsComponent } from './planner/food-category-icons/food-category-icons.component';

@NgModule({
  declarations: [PlannerComponent, PlannerWeekViewComponent, MealSelectionModalComponent, DeleteConfirmationModalComponent, FoodCategoryIconsComponent],
  imports: [CommonModule, MealsRoutingModule, SharedModule]
})
export class MealsModule {}
