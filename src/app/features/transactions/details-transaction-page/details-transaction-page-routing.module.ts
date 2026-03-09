import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsTransactionPage } from './details-transaction-page.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsTransactionPageRoutingModule {}
