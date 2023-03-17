import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from '../models/dtos/meal';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/MealPlans`;
  }

  getRecipesByMealPlanId(mealPlanId: number): Observable<RecipeDto[]> {
    return this.http.get<RecipeDto[]>(`${this.baseUrl}/GetRecipesByMealPlanId/${mealPlanId}`);
  }
}
