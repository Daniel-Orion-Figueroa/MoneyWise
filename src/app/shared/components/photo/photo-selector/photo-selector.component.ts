import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PhotoGalleryModalComponent } from '../photo-gallery-modal/photo-gallery-modal.component';

@Component({
  selector: 'app-photo-selector',
  templateUrl: './photo-selector.component.html',
  styleUrls: ['./photo-selector.component.scss'],
  standalone: false
})
export class PhotoSelectorComponent {
  @Input() photoUrl: string | null = null;
  @Output() photoSelected = new EventEmitter<string | null>();

  constructor(private modalCtrl: ModalController) {}

  async selectPhoto() {
    const modal = await this.modalCtrl.create({
      component: PhotoGalleryModalComponent,
      componentProps: {
        currentPhoto: this.photoUrl
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data) {
      this.photoSelected.emit(data.photo);
    }
  }

  removePhoto() {
    this.photoSelected.emit(null);
  }

  hasPhoto(): boolean {
    return !!this.photoUrl;
  }
}
