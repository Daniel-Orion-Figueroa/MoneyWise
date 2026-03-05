import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthNamePipe',
  standalone: false
})
export class MonthNamePipe implements PipeTransform {

  private months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  transform(value: number): string {
    if (value == null || isNaN(value)) {
      return '';
    }

    // esperándose 0-based mensual, ajustar si se pasa 1-based
    if (value < 0) {
      value = 0;
    }
    if (value > 11) {
      value = 11;
    }

    return this.months[value];
  }

}
