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

export interface MealDateListOfRecipeIdByMealType {
  breakfast: number[];
  lunch: number[];
  dinner: number[];
}

@Component({
  selector: 'app-meal-selection-modal',
  templateUrl: './meal-selection-modal.component.html',
  styleUrls: ['./meal-selection-modal.component.scss']
})
export class MealSelectionModalComponent {
  private mealDateSelectedRecipesByMealType: MealDateListOfRecipeIdByMealType = { breakfast: [], lunch: [], dinner: [] };

  zen: number = 0;
  protein: number = 0;
  carbohydrate: number = 0;
  leafyGreens: number = 0;
  vegetables: number = 0;

  modalData!: MealSelectionModalData;
  foodCategories: FormOption[] = [];

  selectedRecipes: RecipeDto[] = [];
  selectedDishes: MultiSelectGridItem[] = [];

  selectedMealType: MealType = MealType.Breakfast;
  selectedFoodCategory: FoodCategory = FoodCategory.Breakfast;

  dishesFormItem: FormItem = { controlName: 'dishes', label: 'Dishes' };
  dishFormGroup: FormGroup = new FormGroup({});
  initialized: boolean = false;

  constructor(public dialogRef: MatDialogRef<MealSelectionModalComponent>, @Inject(MAT_DIALOG_DATA) data: MealSelectionModalData) {
    this.modalData = data;
    this.selectedMealType = data.mealType;
    this.selectedFoodCategory = data.foodCategory;

    this.foodCategories = this.setFoodCategoriesByMealType(data.mealType);

    this.dishFormGroup.addControl(this.dishesFormItem.controlName, new FormControl(null));

    this.mapSelectedRecipeIdsByMealType();
    this.initializeSelectedRecipes(data.mealType, data.foodCategory);
    this.computeServingsByMealType(data.mealType);
    this.initialized = true;
  }

  removeSelectedDish(item: MultiSelectGridItem): void {
    const currentSelections = this.getSelectedRecipeIdsByMealType(this.selectedMealType);
    const newSelections = currentSelections.filter((c) => c !== item.item_id);

    this.setNewSelections(newSelections);
    this.setDropdownSelectedRecipeIds(this.selectedMealType);
    this.computeServingsByMealType(this.selectedMealType);
  }

  changedDishes(recipeIds: number[] = []): void {
    if (recipeIds.length > 0) {
      this.dishFormGroup.setErrors(null);
    }

    const currentSelections = this.getSelectedRecipeIdsByMealType(this.selectedMealType);
    const newSelections = currentSelections.filter((c) => !this.dishesFormItem.option?.flatMap((o) => o.value).includes(c));
    newSelections.push(...recipeIds);

    this.mapSelectedDishes(newSelections);
    this.setNewSelections(newSelections);
    this.computeServingsByMealType(this.selectedMealType);
  }

  changedMealType(mealType: MealType): void {
    if (this.selectedMealType === mealType) return;

    this.selectedMealType = mealType;
    this.foodCategories = this.setFoodCategoriesByMealType(mealType);
    this.selectedFoodCategory = mealType === MealType.Breakfast ? FoodCategory.Breakfast : FoodCategory.Protein;
    this.initializeSelectedRecipes(this.selectedMealType, this.selectedFoodCategory);
    this.computeServingsByMealType(this.selectedMealType);
  }

  changedFoodCategory(category: FoodCategory): void {
    if (this.selectedFoodCategory === category) return;

    this.selectedFoodCategory = category;
    this.initializeSelectedRecipes(this.selectedMealType, this.selectedFoodCategory);
    this.computeServingsByMealType(this.selectedMealType);
  }

  save(): void {
    if (this.dishFormGroup.get(this.dishesFormItem.controlName)!.value.length === 0) {
      this.dishFormGroup.setErrors({ noSelectedDish: true });
      return;
    }

    this.dialogRef.close({ selectedRecipes: this.mealDateSelectedRecipesByMealType });
  }

  private initializeSelectedRecipes(mealType: MealType, foodCategory: FoodCategory): void {
    this.setDropdownFormOptions(foodCategory);
    this.mapSelectedDishes(this.getSelectedRecipeIdsByMealType(mealType));
    this.setDropdownSelectedRecipeIds(mealType);
  }

  private setNewSelections(newSelections: number[]): void {
    if (this.selectedMealType === MealType.Breakfast) this.mealDateSelectedRecipesByMealType.breakfast = newSelections;
    else if (this.selectedMealType === MealType.Lunch) this.mealDateSelectedRecipesByMealType.lunch = newSelections;
    else this.mealDateSelectedRecipesByMealType.dinner = newSelections;
  }

  private mapSelectedDishes(recipeIds: number[]): void {
    const selectedRecipes = (this.dishesFormItem.option || []).filter((r) => recipeIds.includes(r.value));

    const items: MultiSelectGridItem[] = selectedRecipes.map((r) => ({
      item_id: r.value,
      item_text: r.displayName!
    }));

    this.selectedDishes = items;
  }

  private setDropdownFormOptions(foodCategory: FoodCategory): void {
    this.dishesFormItem.option = Helpers.setFormOptions(
      this.modalData.recipes.filter((r) => r.recipeCategories.some((r) => r.foodCategoryId === foodCategory)),
      'recipeId',
      'recipeName',
      'Select some dishes'
    );
  }

  private setDropdownSelectedRecipeIds(mealType: MealType): void {
    const recipeIds = this.getSelectedRecipeIdsByMealType(mealType);
    this.dishFormGroup.get(this.dishesFormItem.controlName)?.setValue(recipeIds, { emitEvent: false });
  }

  private getSelectedRecipeIdsByMealType(mealType: MealType): number[] {
    if (this.initialized) {
      const { breakfast, lunch, dinner } = this.mealDateSelectedRecipesByMealType;
      return mealType === MealType.Breakfast ? breakfast : mealType === MealType.Lunch ? lunch : dinner;
    } else {
      const mealPlan = this.modalData.mealPlan;
      const meal = mealType === MealType.Breakfast ? mealPlan.breakfast : mealType === MealType.Lunch ? mealPlan.lunch : mealPlan.dinner;
      return meal ? meal.meals.flatMap((r) => r.recipe).map((r) => r.recipeId) : [];
    }
  }

  private mapSelectedRecipeIdsByMealType(): void {
    this.mealDateSelectedRecipesByMealType = {
      breakfast: this.getSelectedRecipeIdsByMealType(MealType.Breakfast),
      lunch: this.getSelectedRecipeIdsByMealType(MealType.Lunch),
      dinner: this.getSelectedRecipeIdsByMealType(MealType.Dinner)
    };
  }

  private setFoodCategoriesByMealType(mealType: MealType): FormOption[] {
    return mealType === MealType.Breakfast
      ? this.modalData.foodCategories.filter((c) => c.value === FoodCategory.Breakfast)
      : this.modalData.foodCategories.filter((c) => c.value !== FoodCategory.Breakfast);
  }

  private computeServingsByMealType(mealType: MealType): void {
    const recipeIds = this.getSelectedRecipeIdsByMealType(mealType);
    const recipes = this.modalData.recipes.filter((r) => recipeIds.includes(r.recipeId));

    if (mealType === MealType.Breakfast) this.zen = this.getNumberOfServingsByFoodCategory(recipes, FoodCategory.Breakfast);
    else {
      this.carbohydrate = this.getNumberOfServingsByFoodCategory(recipes, FoodCategory.Carbohydrate);
      this.protein = this.getNumberOfServingsByFoodCategory(recipes, FoodCategory.Protein);
      this.leafyGreens = this.getNumberOfServingsByFoodCategory(recipes, FoodCategory.LeafyGreens);
      this.vegetables = this.getNumberOfServingsByFoodCategory(recipes, FoodCategory.Vegetables);
    }
  }

  private getNumberOfServingsByFoodCategory(recipes: RecipeDto[], foodCategory: FoodCategory): number {
    return recipes
      .flatMap((r) => r.recipeCategories)
      .filter((r) => r.foodCategoryId === foodCategory)
      .map((rc) => rc.portion)
      .reduce((acc, current) => acc + current, 0);
  }
}
