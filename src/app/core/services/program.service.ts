import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProgramDto } from '../models/dtos';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Programs`;
  }

  getPrograms(): Observable<ProgramDto[]> {
    var programs = this.baseUrl + '/GetPrograms';
    return this.http.get<ProgramDto[]>(programs);
  }

}
