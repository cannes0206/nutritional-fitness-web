import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { MealPlanDto } from '../models/dtos/meal';
import {
  CreateMealPlanRequest,
  CreateMealRequest,
  DeleteMealsByDateRequest,
  GetWeeklyMealPlanRequest,
  UpdateMealPlanRequest,
  UpdateMealRequest
} from '../models/requests';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Meals`;
  }

  createMeal(request: CreateMealRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/CreateMeal`, request);
  }

  createMealPlan(request: CreateMealPlanRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/CreateMealPlan`, request);
  }

  deleteMealById(mealId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteMealById/${mealId}`);
  }

  deleteMealsByDate(request: DeleteMealsByDateRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteMealsByDate`, { body: request });
  }

  deleteMealsByMealPlanId(mealPlanId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/DeleteMealsByMealPlanId/${mealPlanId}`);
  }

  getWeeklyMealPlan(request: GetWeeklyMealPlanRequest): Observable<MealPlanDto> {
    request.startDate = moment(request.startDate).format('YYYY-MM-DD');
    request.endDate = moment(request.endDate).format('YYYY-MM-DD');

    return this.http.post<MealPlanDto>(`${this.baseUrl}/GetWeeklyMealPlan`, request);
  }

  updateMeal(request: UpdateMealRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/UpdateMeal`, request);
  }

  updateMealPlan(request: UpdateMealPlanRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/UpdateMealPlan`, request);
  }
}
