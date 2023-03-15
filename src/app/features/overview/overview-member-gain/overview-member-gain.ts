import { ColumnTypeEnum, InitiateColumn } from "../overview-member-table/overview-member-table";

export class OverviewMemberGain {
}

export const MemberGainColumnHeader: InitiateColumn[] = [
  {
    name: 'name',
    displayName: 'Name',
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'weightGained',
    displayName: 'Weight Gained',
    columnType: ColumnTypeEnum.Numbers
  }
]

export interface MembersGainListDataSourceModel {
  id: number;
  name: string;
  weightGained: number;
}
