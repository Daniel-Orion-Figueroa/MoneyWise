import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTransactionPage } from './lista-transaction-page/lista-transaction-page.page';
import { DetailsTransactionPage } from './details-transaction-page/details-transaction-page.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTransactionPage
  },
  {
    path: 'details/:id',
    component: DetailsTransactionPage
  },
  {
    path: 'new',
    component: ListaTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
