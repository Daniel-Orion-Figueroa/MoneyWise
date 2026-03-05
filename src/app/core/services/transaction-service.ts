import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$: Observable<Transaction[]> = this.transactionsSubject.asObservable();

  constructor(private storage: StorageService) {
    this.loadTransactions();
  }

  private async loadTransactions(): Promise<void> { //carga las transacciones desde el storage y actualiza el subject
    const transactions = await this.storage.getTransactions();
    this.transactionsSubject.next(transactions);
  }

  getCurrentTransactions(): Transaction[] { //devuelve el valor del subject actual de transacciones
    return this.transactionsSubject.value;
  }

  async addTransaction(transaction: Transaction): Promise<void> { //agrega una transacción nueva
    const transactions = this.getCurrentTransactions();
    transactions.push(transaction);
    await this.storage.saveTransactions(transactions);
    this.transactionsSubject.next(transactions);
  }

  async updateTransaction(id: string, updated: Partial<Transaction>): Promise<void> { //actualiza uan transacción por id
    const transactions = this.getCurrentTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index === -1) return;
    transactions[index] = { ...transactions[index], ...updated };
    await this.storage.saveTransactions(transactions);
    this.transactionsSubject.next(transactions);
  }

  async deleteTransaction(id: string): Promise<void> { //elimina una transacción por id
    let transactions = this.getCurrentTransactions();
    transactions = transactions.filter(t => t.id !== id);
    await this.storage.saveTransactions(transactions);
    this.transactionsSubject.next(transactions);
  }

  async clearAll(): Promise<void> { //elimina todas las transacciones
    await this.storage.clearTransactions();
    this.transactionsSubject.next([]);
  }
}

