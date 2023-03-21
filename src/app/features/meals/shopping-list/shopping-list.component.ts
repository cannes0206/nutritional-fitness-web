import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Regex } from 'src/app/shared/constants';
import { RecipeDto, RecipeIngredientDto, RecipeInstructionDto } from '../../../core/models/dtos/meal/recipe-dto';
import { FormItem, ValidationType } from '../../../shared/components/form-controls/form-item';
import { Subject, takeUntil, filter } from 'rxjs';

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
  private _unsubscribe: Subject<void> = new Subject();
  private shoppingListRecipes: ShoppingListRecipe[] = [];

  @Input() set recipes(value: RecipeDto[]) {
    if (value.length > 0) this.mapRecipeFormGroups(value);
    else this.resetDataSources();
  }

  filteredRecipes: ShoppingListRecipe[] = [];

  searchFormGroup: FormGroup = new FormGroup({});
  recipeFilter: FormItem = {
    controlName: 'recipeName',
    label: 'Recipe Name',
    isSearchField: true,
    validationType: ValidationType.alphaNumeric
  };

  ingredientsFilter: FormItem = { controlName: 'ingredients', label: 'Ingredients' };
  directionsFilter: FormItem = { controlName: 'directions', label: 'Directions' };

  recipeFormGroups: FormGroup[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchFormGroup.addControl(this.recipeFilter.controlName, new FormControl('', [Validators.pattern(Regex.ALPHA_NUMERIC)]));
    this.searchFormGroup.addControl(this.ingredientsFilter.controlName, new FormControl(true));
    this.searchFormGroup.addControl(this.directionsFilter.controlName, new FormControl(true));

    this.searchFormGroup
      .get(this.recipeFilter.controlName)!
      .valueChanges.pipe(
        filter(() => this.searchFormGroup.get(this.recipeFilter.controlName)!.valid),
        takeUntil(this._unsubscribe)
      )
      .subscribe((value: string) => {
        this.filteredRecipes = this.shoppingListRecipes;

        if (value && this.filteredRecipes.length > 0)
          this.filteredRecipes = this.filteredRecipes.filter((r) => r.recipeName.toLowerCase().includes(value.toLowerCase()));
      });
  }

  checkAllIngredients(event: MatCheckboxChange): void {
    this.shoppingListRecipes.forEach((r) => (r.ingredientsChecked = event.checked));

    this.recipeFormGroups.forEach((group: FormGroup) => {
      group.get('ingredientsChecked')!.setValue(event.checked, { emitEvent: false });

      const ingredientsFormGroup = group.get('ingredients') as FormGroup;

      Object.keys(ingredientsFormGroup.controls).forEach((ingredientId) =>
        ingredientsFormGroup.get(ingredientId)?.setValue(event.checked, { emitEvent: false })
      );
    });
  }

  checkAllDirections(event: MatCheckboxChange): void {
    this.shoppingListRecipes.forEach((r) => (r.directionsChecked = event.checked));

    this.recipeFormGroups.forEach((group: FormGroup) => {
      group.get('directionsChecked')!.setValue(event.checked, { emitEvent: false });
    });
  }

  checkDirection(recipe: ShoppingListRecipe, event: MatCheckboxChange): void {
    recipe.directionsChecked = event.checked;

    const values = this.recipeFormGroups.flatMap((group: FormGroup) => (group.get('directionsChecked') as FormGroup).value);
    this.searchFormGroup.get(this.directionsFilter.controlName)?.setValue(
      values.every((value) => value),
      { emitEvent: false }
    );
  }

  setIngredientsCheckboxes(): void {
    const ingredientsCheckedValues = this.recipeFormGroups.flatMap((group: FormGroup) => group.get('ingredientsChecked')!.value);
    const ingredientsValues = this.recipeFormGroups.flatMap((group: FormGroup) =>
      Object.values((group.get('ingredients') as FormGroup).value)
    );

    this.searchFormGroup.get(this.ingredientsFilter.controlName)?.setValue(
      [...ingredientsCheckedValues, ...ingredientsValues].every((value) => value),
      { emitEvent: false }
    );
  }

  private mapRecipeFormGroups(recipes: RecipeDto[]): void {
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
      .forEach((recipeIngredientId) => ingredientGroup.addControl(recipeIngredientId.toString(), new FormControl(true)));

    return ingredientGroup;
  }

  private mapDirectionControls(directions: RecipeInstructionDto[]): FormGroup {
    const directionGroup = new FormGroup({});

    directions
      .map((i) => i.recipeInstructionId)
      .forEach((recipeInstructionId) => directionGroup.addControl(recipeInstructionId.toString(), new FormControl(true)));

    return directionGroup;
  }

  private resetDataSources(): void {
    this.filteredRecipes = [];
    this.shoppingListRecipes = [];
    this.recipeFormGroups = [];
  }
}
