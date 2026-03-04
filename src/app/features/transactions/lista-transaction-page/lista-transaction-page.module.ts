import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaTransactionPagePageRoutingModule } from './lista-transaction-page-routing.module';

import { ListaTransactionPagePage } from './lista-transaction-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaTransactionPagePageRoutingModule
  ],
  declarations: [ListaTransactionPagePage]
})
export class ListaTransactionPagePageModule {}
