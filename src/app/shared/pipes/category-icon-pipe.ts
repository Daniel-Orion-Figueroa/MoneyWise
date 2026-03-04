import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryIconPipe',
  standalone: false
})
export class CategoryIconPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
