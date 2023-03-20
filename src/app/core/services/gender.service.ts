import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenderDto } from '../models/dtos';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Gender`;
  }

  getListOfGender(): Observable<GenderDto[]> {
    var getAllGendersUrl = this.baseUrl + '/GetAll';

    return this.http.get<GenderDto[]>(getAllGendersUrl);
  }
}
