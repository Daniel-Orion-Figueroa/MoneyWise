import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: false
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currency: string = 'COP'): string {
    if (value == null) {
      return '';
    }

    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency
    }).format(value);
  }

}
