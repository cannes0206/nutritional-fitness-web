import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient,
    configService: ConfigService) {
    this.baseUrl = configService.nutritionalFitnessApiBaseAddress + '/Users';
  }

  getAllMemberUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/GetAllMembers`);
  }

  getAuthenticatedUser(): Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/AuthenticatedUser`);
  }
}
