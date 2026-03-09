import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth-service';
import { StorageService } from './services/storage-service';
import { TransactionService } from './services/transaction-service';
import { CameraService } from './services/camera-service';
import { AnalitycService } from './services/analityc-service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    StorageService,
    TransactionService,
    CameraService,
    AnalitycService
  ]
})
export class CoreModule { }
