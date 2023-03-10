import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import {
  CreateMealPlanRequest,
  CreateMealRequest,
  DeleteMealsByDateRequest,
  GetWeeklyMealPlanRequest,
  UpdateMealPlanRequest,
  UpdateMealRequest
} from '../models/requests';
import { MealPlanDto } from '../models/dtos';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MealService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/meals`;
  }

  createMeal(request: CreateMealRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/createMeal`, request);
  }

  createMealPlan(request: CreateMealPlanRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/createMealPlan`, request);
  }

  deleteMealById(mealId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMealById/${mealId}`);
  }

  deleteMealsByDate(request: DeleteMealsByDateRequest): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMealsByDate`, { body: request });
  }

  deleteMealsByMealPlanId(mealPlanId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteMealsByMealPlanId/${mealPlanId}`);
  }

  getWeeklyMealPlan(request: GetWeeklyMealPlanRequest): Observable<MealPlanDto> {
    request.startDate = moment(request.startDate).format('YYYY-MM-DD');
    request.endDate = moment(request.endDate).format('YYYY-MM-DD');

    return this.http.post<MealPlanDto>(`${this.baseUrl}/getWeeklyMealPlan`, request);
  }

  updateMeal(request: UpdateMealRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/updateMeal`, request);
  }

  updateMealPlan(request: UpdateMealPlanRequest): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/updateMealPlan`, request);
  }
}
