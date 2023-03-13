export interface InitColumn {
  name: string;
  displayName: string;
  description?: string;
  columnType?: string;
  iconName?: string;
}

export interface InitColumnInline {
  id?: number;
  name: string;
  displayName: string;
  isEditMode?: boolean;
}

export enum ColumnTypeEnum {
  Text = 'text',
  Icons = 'icons',
  TextWithIcons = 'textWithIcons'
}
