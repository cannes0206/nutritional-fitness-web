import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormItem } from '../../../shared/components/form-controls';
import { InitColumn } from '../../../shared/components/table';
import { UserListTableColumns } from './user-list';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  searchMemberField: FormItem = { controlName: 'searchMember', label: 'Name', isSearchField: true };
  filterCycleField: FormItem = { controlName: 'filterCycle', label: 'Select a Cycle' };
  filterSubscriptionField: FormItem = { controlName: 'filterSubscription', label: 'Select a Subsciption' };

  searchFormGroup: FormGroup = new FormGroup({});

  displayedColumnNames: string[] = [];
  initColumn: InitColumn[] = [];

  constructor(private cdref: ChangeDetectorRef) { }

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

    this.cdref.detectChanges();


  }
}
