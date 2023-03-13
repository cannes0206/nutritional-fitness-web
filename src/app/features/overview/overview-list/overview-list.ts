import { ColumnTypeEnum, InitColumn } from "../../../shared/components/table";

export class OverviewList {
}

export interface MembersListDataSourceModel {
  id: number;
  name: string;
  cycle: string;
  phase: string;
  startDate: string;
  startWeight: string;
  currentWeight: string;
  progress: string;
  action: string;
  iconName?: string;
}

export const MemberColumnHeaders: InitColumn[] = [
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
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'currentWeight',
    displayName: 'Current Weight',
    columnType: ColumnTypeEnum.Text
  },
  {
    name: 'progress',
    displayName: 'Progress',
    columnType: ColumnTypeEnum.TextWithIcons,
    iconName: 'iconName'
  },
  {
    name: 'action',
    displayName: '',
    columnType: ColumnTypeEnum.Icons,
    description: "Questionnaire"
  }
]
