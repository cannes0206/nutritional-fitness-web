import { ColumnTypeEnum, InitiateColumn } from "../overview-member-table/overview-member-table";

export class OverviewList {
}

export interface MembersListDataSourceModel {
  id: number;
  name: string;
  cycle: string;
  phase: string;
  startDate: string;
  startWeight: number;
  currentWeight: number;
  progress: number;
  action: string;
  iconName?: string;
}

export const MemberColumnHeaders: InitiateColumn[] = [
  {
    name: 'name',
    displayName: 'Name',
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'cycle',
    displayName: 'Cycle',
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'phase',
    displayName: 'Phase',
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'startDate',
    displayName: 'Start Date',
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'startWeight',
    displayName: 'Start Weight',
    columnType: ColumnTypeEnum.Numbers
  },
  {
    name: 'currentWeight',
    displayName: 'Current Weight',
    columnType: ColumnTypeEnum.Numbers
  },
  {
    name: 'progress',
    displayName: 'Progress',
    columnType: ColumnTypeEnum.NumbersWithIcons,
    iconName: 'iconName'
  },
  {
    name: 'action',
    displayName: '',
    columnType: ColumnTypeEnum.Icons,
    description: "Questionnaire"
  }
]
