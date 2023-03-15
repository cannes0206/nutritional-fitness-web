import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { combineLatest, distinctUntilChanged, map, Observable, startWith, tap } from 'rxjs';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { FormItem } from '../../../shared/components/form-controls';
import { InitiateColumn } from '../overview-member-table/overview-member-table';
import { MemberColumnHeaders, MembersListDataSourceModel } from './overview-list';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent implements OnInit {

  constructor(private userService: UserService) { }

  membersCount: number = 0;
  initialPageSize: number = 20;

  membersDisplayedColumnNames: string[] = ["name", "cycle", "phase", "startDate", "startWeight", "currentWeight", "progress", "action"]
  header: InitiateColumn[] = MemberColumnHeaders;
  memberListdataSource$: Observable<MembersListDataSourceModel[]> = new Observable();

  searchMemberField: FormItem = { controlName: 'searchMember', label: 'Name', isSearchField: true };
  searchFormGroup: FormGroup = new FormGroup({});

  @Input() userDataSource$: Observable<User[]> = new Observable();

  ngOnInit(): void {
    this.setSearchFormGroup();
  }

  private mapListDataSource(users: User[]): MembersListDataSourceModel[] {
    const memberListDataSource: MembersListDataSourceModel[] = [];
    users.forEach((user: User) => {
      const weightDifference = user.startWeight - user.currentWeight;
      var icon = '';
      if (weightDifference > 0) {
        icon = 'arrow_downward';
      } else if (weightDifference < 0) {
        icon = 'arrow_upward';
      }

      memberListDataSource.push({
        id: user.userId,
        name: user.name,
        cycle: user.statusName,
        phase: user.programPhaseName,
        startDate: user.startDate ? moment(user.startDate).format('MMM DD, YYYY') : "-",
        startWeight: user.startWeight,
        currentWeight: user.currentWeight,
        progress: user.startWeight - user.currentWeight,
        action: 'assignment',
        iconName: icon
      })
    });

    return memberListDataSource;
  }

  private setSearchFormGroup() {
    this.searchFormGroup.addControl(this.searchMemberField.controlName, new FormControl(''));

    this.memberListdataSource$ = combineLatest([this.userDataSource$, this.searchFormGroup.get(this.searchMemberField.controlName)!.valueChanges.pipe(startWith(''))])
      .pipe(
        distinctUntilChanged(),
        map(([members, searchText]) => {
          members = members.filter(o => o.name.toLowerCase().includes(searchText.trimStart().toLowerCase()));
          this.membersCount = members.length;
          return this.mapListDataSource(members);
        })
      );
  }
}
