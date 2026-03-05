import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../../core/interfaces/transaction.interface';

@Pipe({
  name: 'searchByTextPipe',
  standalone: false
})
export class SearchByTextPipe implements PipeTransform {

  transform(transactions: Transaction[], searchText: string): Transaction[] { //filtra las transacciones por texto en la descripción
    if (!transactions) {
      return [];
    }

    if (!searchText) {
      return transactions;
    }

    const lowerSearchText = searchText.toLowerCase();
    const filtered = transactions.filter(t => {
      const description = t.description.toLowerCase();
      const isMatch = description.includes(lowerSearchText);
      return isMatch;
    });
    return filtered;
  }

}
