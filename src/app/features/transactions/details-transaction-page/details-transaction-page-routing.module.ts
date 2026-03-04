import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsTransactionPagePage } from './details-transaction-page.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsTransactionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsTransactionPagePageRoutingModule {}
