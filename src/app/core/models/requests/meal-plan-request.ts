export interface CreateMealPlanRequest {
  startDate: string;
  endDate: string;
  servingSize: number;
  isTemplate: boolean;
}

export interface UpdateMealPlanRequest extends CreateMealPlanRequest {
  mealPlanId: number;
}

export interface GetWeeklyMealPlanRequest {
  startDate: string;
  endDate: string;
}
