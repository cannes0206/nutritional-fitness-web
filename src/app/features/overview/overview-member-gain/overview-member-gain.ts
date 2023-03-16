import { ColumnTypeEnum, InitiateColumn } from "../overview-member-table/overview-member-table";

export class OverviewMemberGain {
}

export const MemberGainColumnHeader: InitiateColumn[] = [
  {
    name: 'name',
    displayName: 'Name',
    columnType: ColumnTypeEnum.Text,
    sortable: true
  },
  {
    name: 'weightGained',
    displayName: 'Weight Gained',
    columnType: ColumnTypeEnum.Numbers,
    sortable: true
  }
]

export interface MembersGainListDataSourceModel {
  id: number;
  name: string;
  weightGained: number;
}
