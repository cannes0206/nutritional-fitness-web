export interface CreateMealRequest {
  mealPlanId: number;
  mealTypeId: number;
  recipeIds: number[];
  mealDate: string;
}

export interface UpdateMealRequest {
  mealId: number;
  mealPlanId: number;
  mealTypeId: number;
  recipeId: number;
  servingSize: number;
  mealDate: string;
}

export interface DeleteMealsByDateRequest {
  mealPlanId: number;
  mealDate: string;
}
