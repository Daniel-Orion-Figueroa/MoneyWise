import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthNamePipe',
  standalone: false
})
export class MonthNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
