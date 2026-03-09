import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTransactionPageRoutingModule } from './details-transaction-page-routing.module';

import { DetailsTransactionPage } from './details-transaction-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTransactionPageRoutingModule
  ],
  declarations: [DetailsTransactionPage]
})
export class DetailsTransactionPageModule {}
