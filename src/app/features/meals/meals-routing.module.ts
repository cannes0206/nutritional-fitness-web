import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealPlannerComponent } from './meal-planner/meal-planner.component';

const routes: Routes = [
  {
    path: '',
    component: MealPlannerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealsRoutingModule {}
