import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeDto } from '../models/dtos';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Gender`;
  }

  getListOfGender(): Observable<RecipeDto[]> {
    return this.http.get<RecipeDto[]>(this.baseUrl);
  }
}
