import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../../core/interfaces/transaction.interface';

@Pipe({
  name: 'filterByTypePipe',
  standalone: false
})
export class FilterByTypePipe implements PipeTransform {

  transform(transactions: Transaction[], type: string): Transaction[] { //filtra las transacciones por tipo (ingreso, gasto o todos)
    if (!transactions) {
      return [];
    }

    if (!type || type === 'todos') {
      return transactions;
    }

    const filtered = transactions.filter(t => t.type === type);
    return filtered;
  }

}
