import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendMetrics'
})
export class AppendMetricsPipe implements PipeTransform {

  transform(num: number, args?: any): any {
    return num ? `${num} lbs ` : '-';
  }

}
