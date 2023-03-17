import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { RecipeIngredientDto } from '../models/dtos/meal/recipe-ingredient-dto';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/MealPlans`;
  }

  getRecipeIngredientsByMealPlanId(mealPlanId: number): Observable<RecipeIngredientDto[]> {
    return this.http.get<RecipeIngredientDto[]>(`${this.baseUrl}/GetRecipeIngredients/${mealPlanId}`);
  }
}
