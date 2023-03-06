import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noValue'
})
export class NoValuePipe implements PipeTransform {

  transform(value?: string, emptyValue?: string): string {
    value = (value === 'Invalid date') ? '' : value;

    if (value || typeof value === 'boolean')
        return value;

    return emptyValue || '-';
}

}
