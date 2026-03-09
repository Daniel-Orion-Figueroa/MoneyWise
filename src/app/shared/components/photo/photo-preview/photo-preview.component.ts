import { Component, Input, Output, EventEmitter } from '@angular/core';

export type PhotoSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.scss'],
  standalone: false
})
export class PhotoPreviewComponent {
  @Input() src!: string;
  @Input() size: PhotoSize = 'medium';
  @Input() alt: string = 'Foto';
  @Input() clickable: boolean = true;

  @Output() onClick = new EventEmitter<void>();

  getSizeClass(): string {
    return `size-${this.size}`;
  }

  onPhotoClick() {
    if (this.clickable) {
      this.onClick.emit();
    }
  }

  onImageError(event: any) {
    // Manejo de error si la imagen no carga
    event.target.style.display = 'none';
  }
}
