import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./lista-transaction-page/lista-transaction-page.module').then(m => m.ListaTransactionPagePageModule)
  },
  {
    path: 'details',
    loadChildren: () =>
      import('./details-transaction-page/details-transaction-page.module').then(m => m.DetailsTransactionPagePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
