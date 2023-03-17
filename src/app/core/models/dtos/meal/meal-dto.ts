import { MealType } from 'src/app/core/enums';
import { RecipeDto } from './recipe-dto';

export interface MealDto {
  mealId: number;
  mealTypeId: MealType;
  mealDate: string;
  recipe: RecipeDto;
}
