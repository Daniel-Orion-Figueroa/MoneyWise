import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryColorPipe',
  standalone: false
})
export class CategoryColorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
