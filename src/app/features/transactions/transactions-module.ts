import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';

import { TransactionsRoutingModule } from './transactions-routing-module';
import { ListaTransactionPagePage } from './lista-transaction-page/lista-transaction-page.page';
import { DetailsTransactionPagePage } from './details-transaction-page/details-transaction-page.page';
import { FormTransactionModalComponent } from './components/form-transaction-modal/form-transaction-modal.component';


@NgModule({
  declarations: [
    FormTransactionModalComponent
  ],
  imports: [
    SharedModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
