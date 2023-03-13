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
    //const users = USERS_MOCK;
    //return of(users);
    return this.httpClient.get<User[]>(`${this.baseUrl}/GetAllMembers`);
  }
}

export const USERS_MOCK: User[] = [
  {
    "userId": 1,
    "name": "Bell Guthrieaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "programPhaseName": "Phase Cycles",
    "statusName": "Live",
    "startDate": new Date("2014-10-21T04:31:29 -08:00"),
    "startWeight": 34,
    "currentWeight": 28
  },
  {
    "userId": 1,
    "name": "Cassandra Gibbs",
    "programPhaseName": "Phase Cycles",
    "statusName": "Normalize",
    "startDate": new Date("2020-07-15T02:01:01 -08:00"),
    "startWeight": 35,
    "currentWeight": 40
  },
  {
    "userId": 1,
    "name": "Malinda Lane",
    "programPhaseName": "Mastery",
    "statusName": "Release",
    "startDate": new Date("2019-10-16T02:59:51 -08:00"),
    "startWeight": 26,
    "currentWeight": 25
  },
  {
    "userId": 1,
    "name": "Colette Horne",
    "programPhaseName": "Mastery",
    "statusName": "Release",
    "startDate": new Date("2017-03-29T10:04:26 -08:00"),
    "startWeight": 25,
    "currentWeight": 35
  },
  {
    "userId": 1,
    "name": "Grace Sherman",
    "programPhaseName": "Phase Cycles",
    "statusName": "Indulge",
    "startDate": new Date("2022-12-10T07:49:46 -08:00"),
    "startWeight": 33,
    "currentWeight": 28
  },
  {
    "userId": 1,
    "name": "Lowe Walker",
    "programPhaseName": "Phase Cycles",
    "statusName": "Release",
    "startDate": new Date("2014-12-05T04:51:37 -08:00"),
    "startWeight": 30,
    "currentWeight": 20
  },
  {
    "userId": 1,
    "name": "Brenda Casey",
    "programPhaseName": "Mastery",
    "statusName": "Live",
    "startDate": new Date("2014-01-30T10:02:33 -08:00"),
    "startWeight": 38,
    "currentWeight": 38
  },
  {
    "userId": 1,
    "name": "Jennings Middleton",
    "programPhaseName": "Mastery",
    "statusName": "Release",
    "startDate": new Date("2021-08-27T12:30:37 -08:00"),
    "startWeight": 21,
    "currentWeight": 22
  },
  {
    "userId": 1,
    "name": "Casey Mclean",
    "programPhaseName": "Mastery",
    "statusName": "Live",
    "startDate": new Date("2014-07-11T09:43:50 -08:00"),
    "startWeight": 23,
    "currentWeight": 39
  },
  {
    "userId": 1,
    "name": "Best Jensen",
    "programPhaseName": "Phase Cycles",
    "statusName": "Normalize",
    "startDate": new Date("2022-02-02T06:49:26 -08:00"),
    "startWeight": 33,
    "currentWeight": 31
  },
  {
    "userId": 1,
    "name": "Jones Foster",
    "programPhaseName": "Mastery",
    "statusName": "Indulge",
    "startDate": new Date("2018-07-14T12:08:46 -08:00"),
    "startWeight": 32,
    "currentWeight": 38
  },
  {
    "userId": 1,
    "name": "Veronica Weber",
    "programPhaseName": "Mastery",
    "statusName": "Live",
    "startDate": new Date("2015-03-13T07:20:09 -08:00"),
    "startWeight": 28,
    "currentWeight": 25
  },
  {
    "userId": 1,
    "name": "Roberta Todd",
    "programPhaseName": "Mastery",
    "statusName": "Live",
    "startDate": new Date("2019-10-12T12:49:53 -08:00"),
    "startWeight": 38,
    "currentWeight": 38
  },
  {
    "userId": 1,
    "name": "Chandra Moran",
    "programPhaseName": "Phase Cycles",
    "statusName": "Indulge",
    "startDate": new Date("2018-12-19T02:00:03 -08:00"),
    "startWeight": 21,
    "currentWeight": 40
  }
]
