export class OverviewMemberTable {
}


export enum ColumnTypeEnum {
  Text = 'text',
  Numbers = 'numbers',
  Icons = 'icons',
  NumbersWithIcons = 'numbersWithIcons'
}

export interface InitiateColumn {
  name: string;
  displayName: string;
  description?: string;
  columnType?: string;
  iconName?: string;
}
