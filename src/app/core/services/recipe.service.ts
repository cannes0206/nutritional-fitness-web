import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from '../models/dtos';
import { GetRecipesByMealRequest } from '../models/requests';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/recipes`;
  }

  getRecipes(): Observable<RecipeDto[]> {
    return this.http.get<RecipeDto[]>(this.baseUrl);
  }

  getRecipesByMeal(request: GetRecipesByMealRequest): Observable<RecipeDto[]> {
    const params: HttpParams = new HttpParams()
      .set('mealTypeId', request.mealTypeId)
      .set('mealPlanId', request.mealPlanId)
      .set('mealDate', request.mealDate);

    return this.http.get<RecipeDto[]>(`${this.baseUrl}/getRecipesByMeal`, { params });
  }
}