import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import { TransactionService } from '../../../core/services/transaction-service';
import { Transaction } from '../../../core/interfaces/transaction.interface';
import { TRANSACTION_TYPES } from '../../../core/constants/transaction-type.constants';
import { DEFAULT_CATEGORIES } from '../../../core/constants/category.constants';
import { FormTransactionModalComponent } from '../components/form-transaction-modal/form-transaction-modal.component';

@Component({
  selector: 'app-details-transaction-page',
  templateUrl: './details-transaction-page.page.html',
  styleUrls: ['./details-transaction-page.page.scss'],
  standalone: false
})
export class DetailsTransactionPage implements OnInit {
  transaction: Transaction | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadTransaction(id);
    }
  }

  async loadTransaction(id: string) {
    try {
      const transactions = this.transactionService.getCurrentTransactions();
      this.transaction = transactions.find(t => t.id === id) || null;
    } catch (error) {
      console.error('Error loading transaction:', error);
    }
  }

  goBack() {
    this.router.navigate(['/tabs/transactions']);
  }

  async editTransaction() {
    if (!this.transaction) return;
    
    const modal = await this.modalCtrl.create({
      component: FormTransactionModalComponent,
      componentProps: {
        transaction: this.transaction
      }
    });
    
    await modal.present();
    
    const { data } = await modal.onWillDismiss();
    
    if (data) {
      // Actualizar la transacción
      await this.transactionService.updateTransaction(this.transaction.id, data);
      this.loadTransaction(this.transaction.id); // Recargar para mostrar cambios
    }
  }

  async deleteTransaction() {
    if (!this.transaction) return;
    
    // Usar AlertController de Ionic en lugar de confirm()
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que quieres eliminar esta transacción?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Eliminar',
          handler: async () => {
            try {
              await this.transactionService.deleteTransaction(this.transaction!.id);
              this.router.navigate(['/tabs/transactions']);
            } catch (error) {
              console.error('Error deleting transaction:', error);
            }
          }
        }
      ]
    });
    
    await alert.present();
  }

  getCategoryInfo() {
    if (!this.transaction) return null;
    return DEFAULT_CATEGORIES.find(cat => cat.id === this.transaction!.categoryId);
  }

  getTransactionType(): 'income' | 'expense' | 'neutral' {
    if (!this.transaction) return 'expense';
    return this.transaction!.type === TRANSACTION_TYPES.INCOME ? 'income' : 'expense';
  }
}
