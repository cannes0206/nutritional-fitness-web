import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Regex } from 'src/app/shared/constants';
import { RecipeDto, RecipeIngredientDto, RecipeInstructionDto } from '../../../core/models/dtos/meal/recipe-dto';
import { FormItem } from '../../../shared/components/form-controls/form-item';

interface ShoppingListRecipe {
  recipeName: string;
  recipeId: number;
  ingredients: RecipeIngredientDto[];
  directions: RecipeInstructionDto[];
  recipeChecked: boolean;
  directionsChecked: boolean;
  ingredientsChecked: boolean;
  expanded: boolean;
}

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0',
          visibility: 'hidden'
        })
      ),
      state(
        'expanded',
        style({
          height: '*'
        })
      ),
      transition('collapsed <=> expanded', animate('225ms ease-in-out'))
    ])
  ]
})
export class ShoppingListComponent implements OnInit {
  @Input() set recipes(value: RecipeDto[]) {
    if (value.length > 0) this.mapFormGroup(value);
  }

  private shoppingListRecipes: ShoppingListRecipe[] = [];
  filteredRecipes: ShoppingListRecipe[] = [];

  formGroup: FormGroup = new FormGroup({});
  recipeFilter: FormItem = { controlName: 'recipeName', label: 'Recipe Name', isSearchField: true };

  recipeFormGroups: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // TODO: Add validation for alpha-numeric in form validation
    this.formGroup.addControl(this.recipeFilter.controlName, new FormControl('', [Validators.pattern(Regex.ALPHA_NUMERIC)]));

    this.formGroup.get(this.recipeFilter.controlName)?.valueChanges.subscribe((value: string) => {
      this.filteredRecipes = this.shoppingListRecipes;
      if (value) this.filteredRecipes = this.filteredRecipes.filter((r) => r.recipeName.toLowerCase().includes(value.toLowerCase()));
    });
  }

  checkedAllIngredients(event: MatCheckboxChange): void {
    this.shoppingListRecipes.forEach((r) => (r.ingredientsChecked = event.checked));
  }

  checkedAllDirections(event: MatCheckboxChange): void {
    this.shoppingListRecipes.forEach((r) => (r.directionsChecked = event.checked));
  }

  changedRecipe(recipe: ShoppingListRecipe, event: MatCheckboxChange): void {
    recipe.recipeChecked = event.checked;
    this.recipeFormGroups.forEach((r) => console.log(r.controls));
  }

  changedIngredients(recipe: ShoppingListRecipe, event: MatCheckboxChange): void {
    recipe.ingredientsChecked = event.checked;
  }

  changedIngredient(recipeIngredientId: number, event: MatCheckboxChange): void {
    // TODO: Unchecked ingredients checkboxes if event.checked is false
  }

  changedDirection(recipeInstructionId: number, event: MatCheckboxChange): void {
    // TODO: Unchecked directions filter checkbox if event.checked is false
  }

  changedDirections(recipe: ShoppingListRecipe, event: MatCheckboxChange): void {
    recipe.directionsChecked = event.checked;
  }

  private mapFormGroup(recipes: RecipeDto[]): void {
    this.recipeFormGroups = recipes.map((recipe) =>
      this.fb.group({
        recipeId: recipe.recipeId,
        ingredients: this.mapIngredientControls(recipe.recipeIngredients),
        directions: this.mapDirectionControls(recipe.recipeInstructions),
        recipeChecked: new FormControl(true),
        directionsChecked: new FormControl(true),
        ingredientsChecked: new FormControl(true)
      })
    );

    this.shoppingListRecipes = recipes.map((recipe) => ({
      recipeName: recipe.recipeName,
      recipeId: recipe.recipeId,
      ingredients: recipe.recipeIngredients,
      directions: recipe.recipeInstructions,
      recipeChecked: true,
      directionsChecked: true,
      ingredientsChecked: true,
      expanded: true
    }));

    this.filteredRecipes = this.shoppingListRecipes;
  }

  private mapIngredientControls(ingredients: RecipeIngredientDto[]): FormGroup {
    const ingredientGroup: FormGroup = new FormGroup({});

    ingredients
      .map((i) => i.recipeIngredientId)
      .forEach((recipeIngredientId) => {
        ingredientGroup.addControl(recipeIngredientId.toString(), new FormControl(true));
      });

    return ingredientGroup;
  }

  private mapDirectionControls(directions: RecipeInstructionDto[]): FormGroup {
    const directionGroup = new FormGroup({});

    directions
      .map((i) => i.recipeInstructionId)
      .forEach((recipeInstructionId) => {
        directionGroup.addControl(recipeInstructionId.toString(), new FormControl(true));
      });

    return directionGroup;
  }
}
