import { MealType } from '../../enums';
import { RecipeDto } from './recipe-dto';

export interface MealDto {
  mealId: number;
  mealTypeId: MealType;
  mealDate: string;
  recipe: RecipeDto;
}
