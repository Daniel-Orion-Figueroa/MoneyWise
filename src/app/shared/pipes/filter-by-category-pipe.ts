import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../../core/interfaces/transaction.interface';

@Pipe({
  name: 'filterByCategoryPipe',
  standalone: false
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(transactions: Transaction[], categoryId: string): Transaction[] { //filtra las transacciones por categoria
    if (!transactions) {
      return [];
    }

    if (!categoryId) {
      return transactions;
    }

    const filtered = transactions.filter(t => t.categoryId === categoryId);
    return filtered;
  }

}
