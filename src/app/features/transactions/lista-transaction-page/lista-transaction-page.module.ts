import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared-module';

import { ListaTransactionPageRoutingModule } from './lista-transaction-page-routing.module';

import { ListaTransactionPage } from './lista-transaction-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ListaTransactionPageRoutingModule
  ],
  declarations: []
})
export class ListaTransactionPageModule {}
