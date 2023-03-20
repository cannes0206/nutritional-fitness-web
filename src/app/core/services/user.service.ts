import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { LoginResponse } from '../models/auth.model';
import { SignUpRequest } from '../models/requests/sign-up-request';
import { User } from '../models/user';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl: string;

  constructor(private httpClient: HttpClient, configService: ConfigService) {
    this.baseUrl = `${configService.nutritionalFitnessApiBaseAddress}/Users`;
  }

  getAllMemberUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/GetAllMembers`);
  }

  getAuthenticatedUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/AuthenticatedUser`);
  }

  forgotPassoword(email: string): Observable<User> {
    const request = {
      email: email
    };

    return this.httpClient.post<User>(`${this.baseUrl}/ForgotPassword`, request);
  }

  resetPassword(newPassword: string): Observable<LoginResponse> {
    const request = {
      newPassword: newPassword
    };

    return this.httpClient.post<LoginResponse>(`${this.baseUrl}/ResetPassword`, request);
  }

  registerBasicUser(request: SignUpRequest): Observable<LoginResponse> {
    const authUrl = `${this.baseUrl}/RegisterBasicUser`;
    return this.httpClient.post<LoginResponse>(authUrl, request).pipe(catchError((err) => throwError(() => err)));
  }
}
