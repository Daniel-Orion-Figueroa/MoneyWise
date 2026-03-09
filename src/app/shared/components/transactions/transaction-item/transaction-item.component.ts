import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../../../core/interfaces/transaction.interface';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';
import { TRANSACTION_TYPES } from '../../../../core/constants/transaction-type.constants';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
  standalone: false
})
export class TransactionItemComponent {

  @Input() transaction!: Transaction;
  @Output() onClick = new EventEmitter<Transaction>();

  constructor() { }

  getCategoryInfo() {
    return DEFAULT_CATEGORIES.find((cat: any) => cat.id === this.transaction.categoryId);
  }

  getTransactionType() {
    return this.transaction.type === TRANSACTION_TYPES.INCOME ? 'income' : 'expense';
  }

  getAmountColor() {
    return this.getTransactionType() === 'income' ? 'success' : 'danger';
  }

  getAmountPrefix() {
    return this.getTransactionType() === 'income' ? '+' : '-';
  }

  onItemClick() {
    this.onClick.emit(this.transaction);
  }

  hasReceipt(): boolean {
    return !!this.transaction.photoUrl;
  }

}
