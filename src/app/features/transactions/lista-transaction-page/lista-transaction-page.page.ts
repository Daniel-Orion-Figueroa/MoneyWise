import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { TransactionService } from '../../../core/services/transaction-service';
import { Transaction } from '../../../core/interfaces/transaction.interface';
import { TRANSACTION_TYPES } from '../../../core/constants/transaction-type.constants';
import { FormTransactionModalComponent } from '../components/form-transaction-modal/form-transaction-modal.component';

@Component({
  selector: 'app-lista-transaction-page',
  templateUrl: './lista-transaction-page.page.html',
  styleUrls: ['./lista-transaction-page.page.scss'],
  standalone: false
})
export class ListaTransactionPage implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  isLoading = true;
  
  // Filtros
  selectedType: string = 'all'; // 'all', 'income', 'expense'
  selectedCategory: string = 'all';
  searchText: string = '';

  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  async loadTransactions() {
    try {
      this.isLoading = true;
      this.transactions = this.transactionService.getCurrentTransactions();
      this.applyFilters();
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters() {
    let filtered = [...this.transactions];

    // Filtrar por tipo
    if (this.selectedType !== 'all') {
      filtered = filtered.filter(t => t.type === this.selectedType);
    }

    // Filtrar por categoría
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.categoryId === this.selectedCategory);
    }

    // Filtrar por texto
    if (this.searchText.trim()) {
      const searchLower = this.searchText.toLowerCase();
      filtered = filtered.filter(t => 
        t.description?.toLowerCase().includes(searchLower) ||
        t.amount.toString().includes(searchLower)
      );
    }

    // Ordenar por fecha (más reciente primero)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    this.filteredTransactions = filtered;
  }

  onTypeChange(type: string) {
    this.selectedType = type;
    this.applyFilters();
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    // El evento puede venir como string o como objeto con .value
    this.searchText = typeof event === 'string' ? event : (event?.detail?.value || event?.value || '');
    this.applyFilters();
  }

  async abrirFormulario() {
    const modal = await this.modalCtrl.create({
      component: FormTransactionModalComponent,
      componentProps: {}
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data) {
      // Si el modal retornó datos, guardar la transacción
      await this.transactionService.addTransaction(data);
      this.loadTransactions(); // Recargar la lista
    }
  }

  async onTransactionClick(transaction: Transaction) {
    this.router.navigate(['/tabs/transactions/details', transaction.id]);
  }

  async doRefresh(event: any) {
    await this.loadTransactions();
    event.target.complete();
  }

  getTransactionType(type: string): string {
    return type === TRANSACTION_TYPES.INCOME ? 'income' : 'expense';
  }
}
