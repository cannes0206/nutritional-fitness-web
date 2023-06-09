import { InitColumn } from "../../../shared/components/table";

export const UserListTableColumns: InitColumn[] = [
  { name: 'name', displayName: 'Name' },
  { name: 'age', displayName: 'Age' },
  { name: 'gender', displayName: 'Gender' },
  { name: 'country', displayName: 'Country' },
  { name: 'startDate', displayName: 'Start Date' },
  { name: 'cycle', displayName: 'Cycle' },
  { name: 'subscription', displayName: 'Subscription' },
  { name: 'status', displayName: 'Status' },
  { name: 'action', displayName: '' }
];


export interface UserListDataSourceModel {
  userId: number;
  name: string;
  age: number;
  gender: string;
  country: string;
  startDate: string;
  cycle: string;
  subscription: string;
  status: string;
}
