import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodCategory, MealType } from 'src/app/core/enums';

export interface FoodCategoryData {
  label: string;
  imgSrc: string;
  numberOfServings: number;
  foodCategory: FoodCategory;
}

@Component({
  selector: 'app-food-category-icons',
  templateUrl: './food-category-icons.component.html',
  styleUrls: ['./food-category-icons.component.scss']
})
export class FoodCategoryIconsComponent {
  private foodCategories: FoodCategoryData[] = [
    {
      label: 'Protein',
      imgSrc: 'assets/images/meal_protein.png',
      numberOfServings: 0,
      foodCategory: FoodCategory.Protein
    },
    {
      label: 'Carbohydrate',
      imgSrc: 'assets/images/meal_carbs.png',
      numberOfServings: 0,
      foodCategory: FoodCategory.Carbohydrate
    },
    {
      label: 'Vegetables',
      imgSrc: 'assets/images/meal_veggies.png',
      numberOfServings: 0,
      foodCategory: FoodCategory.Vegetables
    },
    {
      label: 'Leafy Greens',
      imgSrc: 'assets/images/meal_leafy_greens.png',
      numberOfServings: 0,
      foodCategory: FoodCategory.LeafyGreens
    },
    {
      label: 'Zen',
      imgSrc: 'assets/images/meal_zen.png',
      numberOfServings: 0,
      foodCategory: FoodCategory.Breakfast
    }
  ];

  filteredFoodCategories: FoodCategoryData[] = [];

  @Input() set mealType(value: MealType) {
    if (value === MealType.Breakfast)
      this.filteredFoodCategories = this.foodCategories.filter((c) => c.foodCategory === FoodCategory.Breakfast);
    else this.filteredFoodCategories = this.foodCategories.filter((c) => c.foodCategory !== FoodCategory.Breakfast);
  }

  @Input() set protein(value: number) {
    this.setNumberOfServings(FoodCategory.Protein, value);
  }

  @Input() set carbohydrate(value: number) {
    this.setNumberOfServings(FoodCategory.Carbohydrate, value);
  }

  @Input() set vegetables(value: number) {
    this.setNumberOfServings(FoodCategory.Vegetables, value);
  }

  @Input() set leafyGreens(value: number) {
    this.setNumberOfServings(FoodCategory.LeafyGreens, value);
  }

  @Input() set zen(value: number) {
    this.setNumberOfServings(FoodCategory.Breakfast, value);
  }

  @Output() selectedFoodCategory: EventEmitter<FoodCategory> = new EventEmitter<FoodCategory>();

  constructor() {}

  private setNumberOfServings(foodCategory: FoodCategory, numberOfServings: number): void {
    const category = this.foodCategories.find((c) => c.foodCategory === foodCategory);

    if (category) category.numberOfServings = numberOfServings;
  }
}
