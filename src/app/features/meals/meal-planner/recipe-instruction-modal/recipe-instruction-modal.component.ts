import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MealType } from 'src/app/core/enums';
import { RecipeDto } from 'src/app/core/models/dtos/meal';

export interface RecipeInstructionModalData {
  mealType: MealType;
  mealDate: Date;
  recipes: RecipeDto[];
}

@Component({
  selector: 'app-recipe-instruction-modal',
  templateUrl: './recipe-instruction-modal.component.html',
  styleUrls: ['./recipe-instruction-modal.component.scss']
})
export class RecipeInstructionModalComponent {
  mealType: string = '';
  mealDate: Date = new Date();
  recipes: RecipeDto[] = [];

  constructor(public dialogRef: MatDialogRef<RecipeInstructionModalData>, @Inject(MAT_DIALOG_DATA) data: RecipeInstructionModalData) {
    const { mealType, mealDate, recipes } = data;

    this.mealType = MealType[mealType];
    this.mealDate = mealDate;
    this.recipes = recipes;
  }
}
