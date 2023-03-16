import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest, distinctUntilChanged, map, Observable, startWith, tap } from 'rxjs';
import { AppRoutes } from '../../../core/enums';
import { User } from '../../../core/models/user';
import { FormItem } from '../../../shared/components/form-controls';
import { InitColumn } from '../../../shared/components/table';
import { MemberGainColumnHeader, MembersGainListDataSourceModel } from './overview-member-gain';

@Component({
  selector: 'app-overview-member-gain',
  templateUrl: './overview-member-gain.component.html',
  styleUrls: ['./overview-member-gain.component.scss']
})
export class OverviewMemberGainComponent implements OnInit {

  constructor(private router: Router) { }

  membersGainDisplayedColumnNames: string[] = ["name", "weightGained"];
  header: InitColumn[] = MemberGainColumnHeader;
  normalizeMemberDataSource$: Observable<MembersGainListDataSourceModel[]> = new Observable();
  releaseMemberDataSource$: Observable<MembersGainListDataSourceModel[]> = new Observable();

  @Input() userDataSource: User[] = [];

  searchNFMemberField: FormItem = { controlName: 'searchNFMember', label: 'Name', isSearchField: true };
  searchRMemberField: FormItem = { controlName: 'searchRMember', label: 'Name', isSearchField: true };
  searchFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.setFormGroup();
    this.setNormalizeLiveFormGroup();
    this.setReleaseMemberFormGroup();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userDataSource']) {
      this.setFormGroup();
      this.setNormalizeLiveFormGroup();
      this.setReleaseMemberFormGroup();
    }
  }

  selectRow(user: MembersGainListDataSourceModel) {
    this.router.navigateByUrl(`${AppRoutes.Users}/${user.id}`);
  }

  private setFormGroup() {
    this.searchFormGroup.addControl(this.searchNFMemberField.controlName, new FormControl(''));
    this.searchFormGroup.addControl(this.searchRMemberField.controlName, new FormControl(''));
  }

  private setNormalizeLiveFormGroup() {
    this.normalizeMemberDataSource$ = combineLatest([this.searchFormGroup.get(this.searchNFMemberField.controlName)!.valueChanges.pipe(startWith(''))])
      .pipe(
        distinctUntilChanged(),
        map(([searchText]) => {
          var members = this.userDataSource.filter(o => o.name.toLowerCase().includes(searchText.trimStart().toLowerCase()));
          members = members.filter(function (user) {
            const programPhaseIds = [3, 4];
            const gain = user.startWeight ? user.currentWeight - user.startWeight : 0;
            const userRestrictedGain = 2;

            return programPhaseIds.includes(user.programPhaseId) && gain > userRestrictedGain;
            
          });
          return this.mapListDataSource(members);
        })
      );
  }

  private setReleaseMemberFormGroup() {
    this.releaseMemberDataSource$ = combineLatest([this.searchFormGroup.get(this.searchRMemberField.controlName)!.valueChanges.pipe(startWith(''))])
      .pipe(
        distinctUntilChanged(),
        map(([searchText]) => {
          var members = this.userDataSource.filter(o => o.name.toLowerCase().includes(searchText.trimStart().toLowerCase()));
          members = members.filter(function (user) {
            const releasePhaseId = 2;
            const gain = user.startWeight ? user.currentWeight - user.startWeight : 0;
            const userRestrictedGain = 2;

            return releasePhaseId === user.programPhaseId && gain > userRestrictedGain;
          });
          return this.mapListDataSource(members);
        })
      );
  }

  private mapListDataSource(users: User[]): MembersGainListDataSourceModel[] {
    const memberGainListDataSource: MembersGainListDataSourceModel[] = [];

    users.forEach((user: User) => {
      memberGainListDataSource.push({
        id: user.userId,
        name: user.name,
        weightGained: user.currentWeight - user.startWeight
      })
    })

    return memberGainListDataSource;
  }
}
