import { RecipeCategoryDto } from './recipe-category-dto';

export interface RecipeDto {
  recipeId: number;
  recipeName: string;
  servingSize: number;
  recipeCategories: RecipeCategoryDto[];
}
