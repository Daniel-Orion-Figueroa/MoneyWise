import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaTransactionPage } from './lista-transaction-page.page';

const routes: Routes = [
  {
    path: '',
    component: ListaTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaTransactionPageRoutingModule {}
