import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { TransactionService } from './transaction-service';
import { TRANSACTION_TYPES, TransactionType } from '../constants/transaction-type.constants';

@Injectable({
  providedIn: 'root',
})
export class AnalitycService {
  constructor(private transactioService: TransactionService) {}

  getSummary(): Observable<{ income: number; expense: number; balance: number }> { //devuelve un observable con el resumen de ingresos, gastos y balance actual
    return this.transactioService.transactions$.pipe(
      map((transactioService) => {
        const income = transactioService
          .filter((t) => t.type === TRANSACTION_TYPES.INCOME)
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactioService
          .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          income,
          expense,
          balance: income - expense,
        };
      })
    );
  }

  getTotalsByCategory(
    type?: TransactionType
  ): Observable<{ [categoryId: string]: number }> { //devuelve un observable con la suma de montos agrupada por categoria, opcionalmente filtrando por tipo (ingreso o gasto)
    return this.transactioService.transactions$.pipe(
      map((transactioService) => {
        return transactioService
          .filter((t) => (type ? t.type === type : true))
          .reduce((acc: { [key: string]: number }, t) => {
            acc[t.categoryId] = (acc[t.categoryId] || 0) + t.amount;
            return acc;
          }, {} as { [key: string]: number });
      })
    );
  }

  getTransactionsByDate(
    start: Date,
    end: Date
  ): Observable<Transaction[]> { //devuelve un observable con las transacciones que tienen fecha entre start y end (inclusive)
    const startMs = start.getTime();
    const endMs = end.getTime();
    return this.transactioService.transactions$.pipe(
      map((transactioService) =>
        transactioService.filter((t) => {
          const txDate = new Date(t.date).getTime();
          return txDate >= startMs && txDate <= endMs;
        })
      )
    );
  }

  getMonthlyTotals(
    year: number,
    month: number // month 0-based
  ): Observable<{ income: number; expense: number; balance: number }> { //devuelve un observable con el resumen de ingresos, gastos y balance para un mes y año específico, utilizando getTransactionsByDate
    return this.getTransactionsByDate(
      new Date(year, month, 1),
      new Date(year, month + 1, 0, 23, 59, 59, 999)
    ).pipe(
      map((transactioService) => {
        const income = transactioService
          .filter((t) => t.type === TRANSACTION_TYPES.INCOME)
          .reduce((sum, t) => sum + t.amount, 0);
        const expense = transactioService
          .filter((t) => t.type === TRANSACTION_TYPES.EXPENSE)
          .reduce((sum, t) => sum + t.amount, 0);
        return {
          income,
          expense,
          balance: income - expense
        };
      })
    );
  }
}

