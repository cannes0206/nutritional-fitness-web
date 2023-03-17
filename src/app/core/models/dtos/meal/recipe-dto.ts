export interface RecipeCategoryDto {
  recipeCategoryId: number;
  foodCategoryId: number;
  portion: number;
}

export interface RecipeInstructionDto {
  recipeInstructionId: number;
  instruction: string;
  instructionOrder: number;
}

export interface RecipeIngredientDto {
  recipeIngredientId: number;
  recipeId: number;
  recipeName: string;
  ingredient: string;
  ingredientType: string;
  quantity: number;
  measureInitial: string;
  servingSize: number;
  recipeInstruction: RecipeInstructionDto[];
}

export interface RecipeDto {
  recipeId: number;
  recipeName: string;
  servingSize: number;
  recipeCategories: RecipeCategoryDto[];
  recipeInstructions: RecipeInstructionDto[];
  recipeIngredients: RecipeIngredientDto[];
}
