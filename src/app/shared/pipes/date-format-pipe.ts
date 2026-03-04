import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe',
  standalone: false
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string): string {
    if (!value) {
      return '';
    }

    const fecha = new Date(value);
    const hoy = new Date();
    const ayer = new Date();
    ayer.setDate(hoy.getDate() - 1);

    if (fecha.toDateString() === hoy.toDateString()) {
      return 'Hoy';
    }

    if (fecha.toDateString() === ayer.toDateString()) {
      return 'Ayer';
    }

    return fecha.toLocaleDateString('es-CO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

}
