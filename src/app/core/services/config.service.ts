import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../models/app-config';
import { environment } from '../../../environments/environment.prod';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService extends AppConfig {
  constructor(private http: HttpClient) {
    super();
  }

  load(): Observable<string> {
    return this.http
      .get<AppConfig>(`/assets/config/${environment.configFileName}`)
      .pipe(map((data) => (this.nutritionalFitnessApiBaseAddress = data.nutritionalFitnessApiBaseAddress)));
  }
}
