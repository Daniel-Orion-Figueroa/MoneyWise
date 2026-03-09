import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Transaction } from '../../../../core/interfaces/transaction.interface';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';
import { TRANSACTION_TYPES } from '../../../../core/constants/transaction-type.constants';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
  standalone: false
})
export class TransactionDetailsComponent {
  @Input() transaction!: Transaction;
  @Input() showActions: boolean = true;

  @Output() onEdit = new EventEmitter<Transaction>();
  @Output() onDelete = new EventEmitter<Transaction>();

  getCategoryInfo() {
    return DEFAULT_CATEGORIES.find(cat => cat.id === this.transaction.categoryId);
  }

  getCategoryName(): string {
    const category = this.getCategoryInfo();
    return category ? category.name : 'Sin categoría';
  }

  getCategoryColor(): string {
    const category = this.getCategoryInfo();
    return category ? category.color : '#999999';
  }

  getCategoryIcon(): string {
    const category = this.getCategoryInfo();
    return category ? category.icon : 'help-outline';
  }

  getTransactionTypeLabel(): string {
    return this.transaction.type === TRANSACTION_TYPES.INCOME ? 'Ingreso' : 'Gasto';
  }

  getTransactionTypeColor(): string {
    return this.transaction.type === TRANSACTION_TYPES.INCOME ? 'success' : 'danger';
  }

  formatDate(): string {
    const date = new Date(this.transaction.date);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  editTransaction() {
    this.onEdit.emit(this.transaction);
  }

  deleteTransaction() {
    this.onDelete.emit(this.transaction);
  }

  hasReceipt(): boolean {
    return !!this.transaction.photoUrl;
  }

  onPhotoClick() {
    // Emitir evento o abrir modal para ver foto ampliada
    // Por ahora solo log, se puede implementar después
    console.log('Photo clicked:', this.transaction.photoUrl);
  }
}
