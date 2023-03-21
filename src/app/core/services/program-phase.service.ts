import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentPhaseDto, PhaseScheduleDto, ResetUserPhaseScheduleToIndulgeDto } from '../models/dtos/phase-schedule-dto';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class ProgramPhaseService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/ProgramPhase`;
  }

  getCurrentUserPhaseByUserId(userId: number): Observable<PhaseScheduleDto> {
    return this.http.get<PhaseScheduleDto>(`${this.baseUrl}/GetCurrentUserPhaseByUserId/${userId}`);
  }

  updateCurrentPhase(request: CurrentPhaseDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/UpdateCurrentPhase`, request);
  }

  ResetUserPhaseScheduleToIndulge(request: ResetUserPhaseScheduleToIndulgeDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/ResetPhaseScheduleToIndulge`, request);
  }
}
