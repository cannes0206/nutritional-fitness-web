import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodCategory, MealType } from 'src/app/core/enums';
import { DailyMealPlanView, RecipeDto } from 'src/app/core/models/dtos';
import { MultiSelectGridItem } from 'src/app/shared/components/custom-multiselect/custom-multiselect.component';
import { FormItem, FormOption } from '../../../../shared/components/form-controls/form-item';
import { Helpers } from '../../../../shared/utilities/helpers';

export interface MealSelectionModalData {
  mealPlan: DailyMealPlanView;
  foodCategory: FoodCategory;
  mealType: MealType;
  mealTypes: FormOption[];
  foodCategories: FormOption[];
  recipes: RecipeDto[];
}

@Component({
  selector: 'app-meal-selection-modal',
  templateUrl: './meal-selection-modal.component.html',
  styleUrls: ['./meal-selection-modal.component.scss']
})
export class MealSelectionModalComponent {
  modalData!: MealSelectionModalData;
  recipeOptions: FormOption[] = [];
  foodCategories: FormOption[] = [];

  selectedRecipeIds: number[] = [];
  selectedRecipes: RecipeDto[] = [];
  selectedDishes: MultiSelectGridItem[] = [];

  selectedMealType: MealType = MealType.Breakfast;
  selectedFoodCategory: FoodCategory = FoodCategory.Breakfast;

  dishesFormItem: FormItem = { controlName: 'dishes', label: 'Dishes', placeHolder: 'Select some dishes' };
  dishFormGroup: FormGroup = new FormGroup({});

  constructor(public dialogRef: MatDialogRef<MealSelectionModalComponent>, @Inject(MAT_DIALOG_DATA) data: MealSelectionModalData) {
    this.modalData = data;
    this.selectedMealType = data.mealType;
    this.selectedFoodCategory = data.foodCategory;

    this.foodCategories = this.setFoodCategoriesByMealType(data.mealType);

    this.setDishedFormItems(this.selectedFoodCategory);
    this.initializeSelectedRecipes(this.selectedMealType, this.selectedFoodCategory);
    this.dishFormGroup.addControl(this.dishesFormItem.controlName, new FormControl(this.selectedRecipeIds));
  }

  changedDishes(recipes: FormOption[] = []): void {
    // this.selectedRecipeIds = [];
    // this.dishFormGroup.get(this.dishesFormItem.controlName)?.setValue([], { emitEvent: false });
    // this.selectedRecipeIds = recipes.map((r) => r.value);
  }

  changedMealType(mealType: MealType): void {
    this.foodCategories = this.setFoodCategoriesByMealType(mealType);

    this.selectedMealType = mealType;
    this.selectedFoodCategory = mealType === MealType.Breakfast ? FoodCategory.Breakfast : FoodCategory.Protein;
    this.initializeSelectedRecipes(this.selectedMealType, this.selectedFoodCategory);
  }

  changedFoodCategory(category: FoodCategory): void {
    this.selectedFoodCategory = category;
    this.initializeSelectedRecipes(this.selectedMealType, this.selectedFoodCategory);
  }

  initializeSelectedRecipes(mealType: MealType, foodCategory: FoodCategory): void {
    const items: MultiSelectGridItem[] = [];

    const selectedRecipesByCategory = this.getSelectedRecipesByMealType(mealType).filter((r) =>
      r.recipeCategories.some((c) => c.foodCategoryId === foodCategory)
    );

    selectedRecipesByCategory.forEach((r) => {
      items.push({
        item_id: r.recipeId,
        item_text: r.recipeName
      });
    });

    this.selectedDishes = items;
    this.selectedRecipeIds = selectedRecipesByCategory.map((r) => r.recipeId);
    this.dishFormGroup.get(this.dishesFormItem.controlName)?.setValue(this.selectedRecipeIds);
    this.setDishedFormItems(this.selectedFoodCategory);
  }

  save(): void {
    this.dialogRef.close();
  }

  private getSelectedRecipesByMealType(mealType: MealType): RecipeDto[] {
    const mealPlan = this.modalData.mealPlan;

    const meal = mealType === MealType.Breakfast ? mealPlan.breakfast : mealType === MealType.Lunch ? mealPlan.lunch : mealPlan.dinner;
    return meal ? meal.meals.flatMap((r) => r.recipe) : [];
  }

  private setDishedFormItems(foodCategory: FoodCategory): void {
    this.dishesFormItem.option = Helpers.setFormOptions(
      this.modalData.recipes.filter((r) => r.recipeCategories.some((r) => r.foodCategoryId === foodCategory)),
      'recipeId',
      'recipeName',
      'Select some dishes'
    );
  }

  private setFoodCategoriesByMealType(mealType: MealType): FormOption[] {
    return mealType === MealType.Breakfast
      ? this.modalData.foodCategories.filter((c) => c.value === FoodCategory.Breakfast)
      : this.modalData.foodCategories.filter((c) => c.value !== FoodCategory.Breakfast);
  }
}
