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
