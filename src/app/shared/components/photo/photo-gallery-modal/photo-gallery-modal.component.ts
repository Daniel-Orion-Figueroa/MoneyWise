import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
      // Simulación de toma de foto - en producción usaría Camera plugin
      const photoUrl = await this.simulateCamera();
      this.modalCtrl.dismiss({ photo: photoUrl });
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  }

  async selectFromGallery() {
    try {
      // Simulación de selección de galería - en producción usaría ImagePicker
      const photoUrl = await this.simulateGallery();
      this.modalCtrl.dismiss({ photo: photoUrl });
    } catch (error) {
      console.error('Error selecting from gallery:', error);
    }
  }

  removePhoto() {
    this.modalCtrl.dismiss({ photo: null });
  }

  close() {
    this.modalCtrl.dismiss();
  }

  // Simulaciones para desarrollo
  private async simulateCamera(): Promise<string> {
    // Simular foto de cámara
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
  }

  private async simulateGallery(): Promise<string> {
    // Simular foto de galería
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`;
  }

  hasCurrentPhoto(): boolean {
    return !!this.currentPhoto;
  }
}
