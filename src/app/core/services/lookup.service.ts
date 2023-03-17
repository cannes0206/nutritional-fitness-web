import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodCategoryDto, MealTypesDto } from '../models/dtos/meal';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Lookups`;
  }

  getFoodCategories(): Observable<FoodCategoryDto[]> {
    return this.http.get<FoodCategoryDto[]>(`${this.baseUrl}/FoodCategories`);
  }

  getMealTypes(): Observable<MealTypesDto[]> {
    return this.http.get<MealTypesDto[]>(`${this.baseUrl}/MealTypes`);
  }
}
