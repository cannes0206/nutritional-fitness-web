import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodCategory } from 'src/app/core/enums';
import { MealType } from '../../../../core/enums/meal-type.enum';
import { RecipeDto } from '../../../../core/models/dtos/recipe-dto';
import { FormItem, FormOption } from '../../../../shared/components/form-controls/form-item';
import { Helpers } from '../../../../shared/utilities/helpers';

export interface MealSelectionModalData {
  mealDate: string | Date;
  foodCategory?: FoodCategory;
  mealType: MealType;
  mealTypes: FormOption[];
  foodCategories: FormOption[];
  recipes: RecipeDto[];
  dishes: RecipeDto[];
}

@Component({
  selector: 'app-meal-selection-modal',
  templateUrl: './meal-selection-modal.component.html',
  styleUrls: ['./meal-selection-modal.component.scss']
})
export class MealSelectionModalComponent {
  mealDate: Date = new Date();
  mealData!: MealSelectionModalData;
  recipeOptions: FormOption[] = [];
  foodCategories: FormOption[] = [];

  selectedRecipeIds: number[] = [];

  selectedMealType: MealType = MealType.Breakfast;
  selectedFoodCategory?: FoodCategory;

  dishesFormItem: FormItem = { controlName: 'dishes', label: 'Dishes' };
  dishFormGroup: FormGroup = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<MealSelectionModalComponent>, @Inject(MAT_DIALOG_DATA) data: MealSelectionModalData) {
    this.mealData = data;
    this.selectedMealType = data.mealType;
    this.selectedFoodCategory = data.foodCategory;
    this.dishesFormItem.option = Helpers.setFormOptions(data.recipes, 'recipeId', 'recipeName');
    this.dishFormGroup.addControl(this.dishesFormItem.controlName, new FormControl());

    this.foodCategories =
      data.mealType === Number(MealType.Breakfast) ? [] : data.foodCategories.filter((c) => c.value !== FoodCategory.Breakfast);
  }

  mapSelections(): void {
    this.dishFormGroup.get(this.dishesFormItem.controlName)?.setValue(this.mealData.dishes.map((d) => d.recipeId));
  }

  changedDishes(recipes: FormOption[] = []): void {
    this.selectedRecipeIds = [];
    this.dishFormGroup.get(this.dishesFormItem.controlName)?.setValue([], { emitEvent: false });
    this.selectedRecipeIds = recipes.map((r) => r.value);
  }

  changedMealType(mealType: MealType): void {
    this.foodCategories =
      mealType === MealType.Breakfast ? [] : this.mealData.foodCategories.filter((c) => c.value !== FoodCategory.Breakfast);
    this.selectedMealType = mealType;
  }

  changedFoodCategory(category: FoodCategory): void {
    this.selectedFoodCategory = category;
    this.dishesFormItem.option = Helpers.setFormOptions(
      this.mealData.recipes.filter((r) => r.recipeCategories.some((c) => c.foodCategoryId === category)),
      'recipeId',
      'recipeName'
    );
  }

  save(): void {
    this.dialogRef.close();
  }
}
