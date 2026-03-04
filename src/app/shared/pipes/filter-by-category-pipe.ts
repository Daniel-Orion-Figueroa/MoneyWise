import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategoryPipe',
  standalone: false
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
