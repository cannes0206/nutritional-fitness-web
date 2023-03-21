import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConfig } from '../models/app-config';

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
