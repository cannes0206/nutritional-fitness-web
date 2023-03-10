import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { FoodCategoryDto, MealTypesDto } from '../models/dtos';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/lookups`;
  }

  getFoodCategories(): Observable<FoodCategoryDto[]> {
    return this.http.get<FoodCategoryDto[]>(`${this.baseUrl}/foodCategories`);
  }

  getMealTypes(): Observable<MealTypesDto[]> {
    return this.http.get<MealTypesDto[]>(`${this.baseUrl}/mealTypes`);
  }
}
