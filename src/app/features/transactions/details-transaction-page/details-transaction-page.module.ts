import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsTransactionPagePageRoutingModule } from './details-transaction-page-routing.module';

import { DetailsTransactionPagePage } from './details-transaction-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsTransactionPagePageRoutingModule
  ],
  declarations: [DetailsTransactionPagePage]
})
export class DetailsTransactionPagePageModule {}
