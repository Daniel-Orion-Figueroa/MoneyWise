import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Component({
  selector: 'app-photo-gallery-modal',
  templateUrl: './photo-gallery-modal.component.html',
  styleUrls: ['./photo-gallery-modal.component.scss'],
  standalone: false
})
export class PhotoGalleryModalComponent {
  @Input() currentPhoto: string | null = null;

  constructor(private modalCtrl: ModalController) {}

  async takePhoto() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      if (photo.dataUrl) {
        this.modalCtrl.dismiss({ photo: photo.dataUrl });
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      // Si falla la cámara, usar simulación
      const photoUrl = await this.simulateCamera();
      this.modalCtrl.dismiss({ photo: photoUrl });
    }
  }

  async selectFromGallery() {
    try {
      const photo = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos
      });

      if (photo.dataUrl) {
        this.modalCtrl.dismiss({ photo: photo.dataUrl });
      }
    } catch (error) {
      console.error('Error selecting from gallery:', error);
      // Si falla la galería, usar simulación
      const photoUrl = await this.simulateGallery();
      this.modalCtrl.dismiss({ photo: photoUrl });
    }
  }

  removePhoto() {
    this.modalCtrl.dismiss({ photo: null });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  // Simulaciones como fallback
  private async simulateCamera(): Promise<string> {
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
  }

  private async simulateGallery(): Promise<string> {
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
  }

  hasCurrentPhoto(): boolean {
    return !!this.currentPhoto;
  }
}
