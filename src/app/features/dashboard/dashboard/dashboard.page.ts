import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../core/services/transaction-service';
import { AnalitycService } from '../../../core/services/analityc-service';
import { DEFAULT_CATEGORIES } from '../../../core/constants/category.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit {
  currentBalance = 0;
  monthlyIncome = 0;
  monthlyExpense = 0;
  categoryExpenses: { [key: string]: { name: string; amount: number; percentage: number; color: string } } = {};
  categoryIncomes: { [key: string]: { name: string; amount: number; percentage: number; color: string } } = {};
  isLoading = true;
  Object = Object; // Agregar Object para usar en template

  constructor(
    private transactionService: TransactionService,
    private analyticsService: AnalitycService
  ) {}

  async ngOnInit() {
    await this.loadDashboardData();
  }

  async loadDashboardData() {
    try {
      this.isLoading = true;
      
      // Obtener transacciones actuales
      const transactions = this.transactionService.getCurrentTransactions();
      
      // Calcular balance actual
      const summary = this.analyticsService.getSummary();
      summary.subscribe(data => {
        this.currentBalance = data.balance;
      });
      
      // Calcular totales del mes actual
      const now = new Date();
      const monthlySummary = this.analyticsService.getMonthlyTotals(now.getFullYear(), now.getMonth());
      monthlySummary.subscribe(data => {
        this.monthlyIncome = data.income;
        this.monthlyExpense = data.expense;
      });
      
      // Calcular gastos por categoría
      const categoryTotals = this.analyticsService.getTotalsByCategory('expense');
      categoryTotals.subscribe(totals => {
        this.categoryExpenses = this.calculateCategoryPercentages(totals);
      });
      
      // Calcular ingresos por categoría
      const incomeTotals = this.analyticsService.getTotalsByCategory('income');
      incomeTotals.subscribe(totals => {
        this.categoryIncomes = this.calculateCategoryPercentages(totals);
      });
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private calculateCategoryPercentages(totals: { [key: string]: number }): { [key: string]: { name: string; amount: number; percentage: number; color: string } } {
    const total = Object.values(totals).reduce((sum, amount) => sum + amount, 0);
    
    return Object.entries(totals).reduce((acc, [categoryId, amount]) => {
      const category = DEFAULT_CATEGORIES.find(cat => cat.id === categoryId);
      if (category) {
        acc[categoryId] = {
          name: category.name,
          amount,
          percentage: total > 0 ? (amount / total) * 100 : 0,
          color: category.color
        };
      }
      return acc;
    }, {} as { [key: string]: { name: string; amount: number; percentage: number; color: string } });
  }

  async doRefresh(event: any) {
    await this.loadDashboardData();
    event.target.complete();
  }
}
