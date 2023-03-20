import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryDto } from '../models/dtos';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Countries`;
  }

  getListOfCountry(): Observable<CountryDto[]> {

    var getAllCountriesUrl = this.baseUrl + '/GetAllCountries';

    return this.http.get<CountryDto[]>(getAllCountriesUrl);
  }
}
