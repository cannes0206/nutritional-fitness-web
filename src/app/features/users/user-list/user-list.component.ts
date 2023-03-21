import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import moment from 'moment';
import { combineLatest, debounceTime, distinctUntilChanged, map, Observable, pairwise, startWith } from 'rxjs';
import { UserDto } from '../../../core/models/dtos';
import { UserService } from '../../../core/services';
import { ProgramService } from '../../../core/services/program.service';
import { FormItem, FormOption } from '../../../shared/components/form-controls';
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
    private userService: UserService,
    private programService: ProgramService) { }

  ngOnInit(): void {
    this.setUserListTableProperties();
    this.setSearchFormGroup();
    this.renderDropdownFilters();
  }

  renderDropdownFilters(): void {
    this.renderSubcscriptionFilter();
  }

  renderSubcscriptionFilter(): void {
    this.programService.getPrograms().subscribe((data) => {
      const options: FormOption[] = data.map((z, index) => ({
        value: index,
        displayName: `${z.programName}`
      }));

      options.unshift({
        value: null,
        displayName: 'Select a Subscription'
      });

      this.filterSubscriptionField.option = options;
    });
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
    this.dataSource$ = combineLatest([this.userList$,
    this.searchFormGroup.get(this.searchMemberField.controlName)!.valueChanges.pipe(startWith('')),
    this.searchFormGroup.get(this.filterSubscriptionField.controlName)!.valueChanges.pipe(debounceTime(100), startWith(null))])
      .pipe(
        distinctUntilChanged(),
        map(([userLists, searchText, subscription]) => {

          if (searchText)
            userLists = userLists.filter(o => o.name.toLowerCase().includes(searchText.trimStart().toLowerCase()));

          if (subscription != null) {
            subscription += 1;
            userLists = userLists.filter(u => u.programId == subscription);
          }

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
        subscription: user.program ? user.program.programName : '-',
        status: user.active ? 'Active' : 'Inactive'
      })
    });

    return userListDataSourceModel;
  }
}
