import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { MealsRoutingModule } from './meals-routing.module';
import { MealSelectionModalComponent, PlannerComponent, PlannerWeekViewComponent } from './planner';
import { DeleteConfirmationModalComponent } from './planner/delete-confirmation-modal/delete-confirmation-modal.component';

@NgModule({
  declarations: [PlannerComponent, PlannerWeekViewComponent, MealSelectionModalComponent, DeleteConfirmationModalComponent],
  imports: [CommonModule, MealsRoutingModule, SharedModule]
})
export class MealsModule {}
