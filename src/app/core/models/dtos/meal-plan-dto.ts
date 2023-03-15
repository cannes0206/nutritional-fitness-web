import { MealDto } from './meal-dto';

export interface MealPlanDto {
  mealPlanId: number;
  userId?: number;
  startDate: string;
  endDate: string;
  servingSize: number;
  isTemplate: boolean;
  meals: MealDto[];
}

export interface MealPlanNutritionInfo {
  meals: MealDto[];
  totalZenScore: number;
  zen?: number;
  protein?: number;
  carbohydrate?: number;
  leafyGreens?: number;
  vegetables?: number;
}

export interface DailyMealPlanView {
  day: string;
  totalMealScore: number;
  totalMealScoreClass: 'primary' | 'warning' | 'danger' | 'secondary';
  mealDate: Date;
  breakfast: MealPlanNutritionInfo;
  lunch: MealPlanNutritionInfo;
  dinner: MealPlanNutritionInfo;
}
