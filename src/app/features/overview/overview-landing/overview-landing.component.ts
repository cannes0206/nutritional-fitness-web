import { Component, OnInit } from '@angular/core';
import { distinctUntilChanged, map, Observable, startWith, tap } from 'rxjs';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { OverviewTabEnum } from './overview-landing';

@Component({
  selector: 'app-overview-landing',
  templateUrl: './overview-landing.component.html',
  styleUrls: ['./overview-landing.component.scss']
})
export class OverviewLandingComponent implements OnInit {

  overviewTabs = Object.values(OverviewTabEnum);
  overviewTabsEnum = OverviewTabEnum;
  currentTab: OverviewTabEnum = OverviewTabEnum.Members;

  membersCount: number = 0;
  membersGainCount: number = 0;

  userDataSource$: Observable<User[]> = new Observable();
  filteredUserDataSource$: Observable<User[]> = new Observable();


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.retrieveUserMemberData();
  }

  private retrieveUserMemberData() {
    this.userDataSource$ = this.userService.getAllMemberUser().pipe(
      tap(users => {
        this.membersCount = users.length
      }),
      startWith([]));

    this.filteredUserDataSource$ = this.userDataSource$.pipe(
      distinctUntilChanged(),
      map(users => {
        const filteredUser = users.filter(function (user) {
          const programPhaseIds = [2, 3, 4];
          const warningWeightGain = 2;
          const memberGain = user.currentWeight - user.startWeight;

          return programPhaseIds.includes(user.programPhaseId) && memberGain >= warningWeightGain;
        });
        this.membersGainCount = filteredUser.length;
        return filteredUser;
      }),
      startWith([]));
  }

}
