import { Component, OnInit } from '@angular/core';
import { FormTransactionModalComponent } from '../components/form-transaction-modal/form-transaction-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-transaction-page',
  templateUrl: './lista-transaction-page.page.html',
  styleUrls: ['./lista-transaction-page.page.scss'],
  standalone: false

})
export class ListaTransactionPagePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async abrirFormulario() {
    const modal = await this.modalCtrl.create({
      component: FormTransactionModalComponent,
      componentProps: {
        transaccion: null
      }
    })
    await modal.present();
  }

}
