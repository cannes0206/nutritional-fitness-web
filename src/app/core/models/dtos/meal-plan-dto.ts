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

export interface MealTypeServingSize {
  meals: MealDto[];
  totalZenScore: number;
  zen?: number;
  protein?: number;
  carbohydrate?: number;
  leafyGreens?: number;
  vegetables?: number;
}

export interface MealPlannerWeekView {
  day: string;
  totalMealScore: number;
  totalMealScoreClass: 'primary' | 'warning' | 'danger' | 'secondary';
  mealDate: Date;
  breakfast: MealTypeServingSize;
  lunch: MealTypeServingSize;
  dinner: MealTypeServingSize;
}
