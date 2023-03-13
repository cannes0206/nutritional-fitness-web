import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { combineLatest, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { FormItem } from '../../../shared/components/form-controls';
import { InitColumn } from '../../../shared/components/table';
import { MemberColumnHeaders, MembersListDataSourceModel } from './overview-list';

@Component({
  selector: 'app-overview-list',
  templateUrl: './overview-list.component.html',
  styleUrls: ['./overview-list.component.scss']
})
export class OverviewListComponent implements OnInit {

  constructor(private userService: UserService) { }

  membersDisplayedColumnNames: string[] = ["name", "cycle", "phase", "startDate", "startWeight", "currentWeight", "progress", "action"]
  header: InitColumn[] = MemberColumnHeaders;
  memberListdataSource$: Observable<MembersListDataSourceModel[]> = new Observable();
  userDataSource$: Observable<User[]> = new Observable();

  searchMemberField: FormItem = { controlName: 'searchMember', label: 'Name', isSearchField: true };
  searchFormGroup: FormGroup = new FormGroup({});

  @Output() membersCount: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.setSearchFormGroup();
  }

  private mapListDataSource(users: User[]): MembersListDataSourceModel[] {
    const memberListDataSource: MembersListDataSourceModel[] = [];
    users.forEach((user: User) => {
      const weightDifference = user.startWeight - user.currentWeight;
      var progress = '-';
      var icon = '';
      if (weightDifference > 0) {
        progress = weightDifference + " lbs"
        icon = 'arrow_upward';
      } else if (weightDifference < 0) {
        progress = Math.abs(weightDifference) + " lbs"
        icon = 'arrow_downward';
      }

      memberListDataSource.push({
        id: user.userId,
        name: user.name,
        cycle: user.statusName,
        phase: user.programPhaseName,
        startDate: user.startDate ? moment(user.startDate).format('MMM DD, YYYY') : "-",
        startWeight: `${user.startWeight} lbs` ,
        currentWeight: `${user.currentWeight} lbs`,
        progress: progress,
        action: 'assignment',
        iconName: icon
      })
    });

    return memberListDataSource;
  }

  private setSearchFormGroup() {
    this.searchFormGroup.addControl(this.searchMemberField.controlName, new FormControl(''));

    this.userDataSource$ = this.userService.getAllMemberUser().pipe(startWith([]));
    this.memberListdataSource$ = combineLatest([this.userDataSource$, this.searchFormGroup.get(this.searchMemberField.controlName)!.valueChanges.pipe(startWith(''))])
      .pipe(
        distinctUntilChanged(),
        map(([members, searchText]) => {
          members = members.filter(o => o.name.toLowerCase().includes(searchText.trimStart().toLowerCase()));
          this.membersCount.emit(members.length); 
          return this.mapListDataSource(members);
        })
      );
  }
}
