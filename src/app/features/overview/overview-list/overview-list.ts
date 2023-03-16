import { ColumnTypeEnum, InitiateColumn } from "../overview-member-table/overview-member-table";

export class OverviewList {
}

export interface MembersListDataSourceModel {
  id: number;
  name: string;
  cycle: string;
  phase: string;
  startDate: Date;
  startWeight: number;
  currentWeight: number;
  progress?: number;
  action: string;
  iconName?: string;
}

export const MemberColumnHeaders: InitiateColumn[] = [
  {
    name: 'name',
    displayName: 'Name',
    columnType: ColumnTypeEnum.Text,
    sortable: true
  },
  {
    name: 'cycle',
    displayName: 'Cycle',
    columnType: ColumnTypeEnum.Text,
    sortable: true
  },
  {
    name: 'phase',
    displayName: 'Phase',
    columnType: ColumnTypeEnum.Text,
    sortable: true
  },
  {
    name: 'startDate',
    displayName: 'Start Date',
    columnType: ColumnTypeEnum.Date,
    sortable: true
  },
  {
    name: 'startWeight',
    displayName: 'Start Weight',
    columnType: ColumnTypeEnum.Numbers,
    sortable: true
  },
  {
    name: 'currentWeight',
    displayName: 'Current Weight',
    columnType: ColumnTypeEnum.Numbers,
    sortable: true
  },
  {
    name: 'progress',
    displayName: 'Progress',
    columnType: ColumnTypeEnum.NumbersWithIcons,
    iconName: 'iconName',
    sortable: true
  },
  {
    name: 'action',
    displayName: '',
    columnType: ColumnTypeEnum.Icons,
    description: "Questionnaire",
    sortable: false
  }
]
