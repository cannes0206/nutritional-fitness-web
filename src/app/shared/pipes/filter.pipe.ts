import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform<T, Key extends keyof T>(items: T[], searchText: string, fieldName: Key, filterType: 'string' | 'date' = 'string'): T[] {
    if (!items || items.length === 0) return [];

    if (!searchText) return items;

    return items.filter((item: T) => {
      if (item && item[fieldName]) {
        if (filterType === 'date')
          return moment(item[fieldName] as unknown as Date).format('YYYY-MM-DD') === moment(searchText).format('YYYY-MM-DD');

        return String(item[fieldName]).toLowerCase().includes(searchText);
      }
      return false;
    });
  }
}
