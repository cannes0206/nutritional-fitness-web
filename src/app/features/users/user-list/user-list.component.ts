import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { combineLatest, distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { UserDto } from '../../../core/models/dtos';
import { UserService } from '../../../core/services';
import { FormItem } from '../../../shared/components/form-controls';
import { InitColumn } from '../../../shared/components/table';
import { UserListDataSourceModel, UserListTableColumns } from './user-list';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private userList$!: Observable<UserDto[]>;
  dataSource$: Observable<UserListDataSourceModel[]> = new Observable();

  searchMemberField: FormItem = { controlName: 'searchMember', label: 'Name', isSearchField: true };
  filterCycleField: FormItem = { controlName: 'filterCycle', label: 'Select a Cycle' };
  filterSubscriptionField: FormItem = { controlName: 'filterSubscription', label: 'Select a Subsciption' };

  searchFormGroup: FormGroup = new FormGroup({});

  displayedColumnNames: string[] = [];
  initColumn: InitColumn[] = [];

  constructor(
    private cdref: ChangeDetectorRef,
    private userService: UserService) { }

  ngOnInit(): void {
    this.setUserListTableProperties();
    this.setSearchFormGroup();
  }

  setUserListTableProperties(): void {
    this.initColumn = UserListTableColumns;
    this.displayedColumnNames = this.initColumn.map(i => i.name);

  }

  setSearchFormGroup(): void {
    this.searchFormGroup.addControl(this.searchMemberField.controlName, new FormControl(''));
    this.searchFormGroup.addControl(this.filterCycleField.controlName, new FormControl(''));
    this.searchFormGroup.addControl(this.filterSubscriptionField.controlName, new FormControl(''));


    this.userList$ = this.userService.getAllUsers().pipe(startWith([]));
    this.dataSource$ = combineLatest([this.userList$, this.searchFormGroup.get(this.searchMemberField.controlName)!.valueChanges.pipe(startWith(''))])
      .pipe(
        distinctUntilChanged(),
        map(([userLists, searchText]) => {
          console.log(userLists);
          userLists = userLists.filter(o => o.name.toLowerCase().includes(searchText.trimStart().toLowerCase()));
          return this.mapListDataSource(userLists);
        })
      );
 
    this.cdref.detectChanges();
  }

  private mapListDataSource(userList: UserDto[]): UserListDataSourceModel[] {
    const userListDataSourceModel: UserListDataSourceModel[] = [];

    userList.forEach((user: UserDto) => {
      userListDataSourceModel.push({
        userId: user.userId,
        name: user.name,
        age: Number(user.age),
        gender: user.gender.genderName,
        country: user.country.countryName,
        startDate: moment(user.startDate).format('MMMM DD, YYYY'),
        cycle: user.status ? user.status.statusName : '-',
        subscription: user.pragram ? user.pragram.programName : '-',
        status: user.active ? 'Active' : 'Inactive'
      })
    });

    return userListDataSourceModel;
  }
}
