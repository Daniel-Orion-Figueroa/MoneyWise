import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared-module';

import { TransactionsRoutingModule } from './transactions-routing-module';
import { ListaTransactionPage } from './lista-transaction-page/lista-transaction-page.page';
import { DetailsTransactionPage } from './details-transaction-page/details-transaction-page.page';
import { FormTransactionModalComponent } from './components/form-transaction-modal/form-transaction-modal.component';

@NgModule({
  declarations: [
    ListaTransactionPage,
    DetailsTransactionPage,
    FormTransactionModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    SharedModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
