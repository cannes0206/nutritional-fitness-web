export interface InitColumn {
  name: string;
  displayName: string;
  description?: string;
}

export interface InitColumnInline {
  id?: number;
  name: string;
  displayName: string;
  isEditMode?: boolean;
}