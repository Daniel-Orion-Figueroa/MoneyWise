import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByTypePipe',
  standalone: false
})
export class FilterByTypePipe implements PipeTransform {

  transform(transacciones: any[], tipo: string): any[] {
    if (!tipo || tipo === 'todos') {
      return transacciones;
    }

    return transacciones.filter(t => t.tipo === tipo);
  }

}
