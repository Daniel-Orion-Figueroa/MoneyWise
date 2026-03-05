import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

  constructor(private storage: StorageService) {}

  async takePhoto(): Promise<Photo> { //captura fotos usando la camara del movil
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        saveToGallery: true, //guarda en la galería automaticamente
      });

      return image;
    } catch (error) {
      console.error('Error tomando foto:', error);
      throw error;
    }
  }

  async pickFromGallery(): Promise<Photo> { //seleccina fotos desde la galeria del movil
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });

      return image;
    } catch (error) {
      console.error('Error seleccionando foto de galería:', error);
      throw error;
    }
  }

  async savePhoto(photo: Photo, fileName?: string): Promise<string> {
    try {// photo: foto obtenida de camara o galeria, fileName: nombre del archivo (opcional, si no se proporciona se genera uno con timestamp)

      //convierte la foto a base64
      const base64Data = await this.readAsBase64(photo);

      //genera el nombre de archivo si no se proporciona
      const name = fileName || `photo_${Date.now()}.jpeg`;

      //guarda el archivo en el directorio de datos de la app
      const savedFile = await Filesystem.writeFile({
        path: name,
        data: base64Data,
        directory: Directory.Data,
      });

      //devuelve la ruta del archivo guardado
      return savedFile.uri;
    } catch (error) {
      console.error('Error guardando foto:', error);
      throw error;
    }
  }

  private async readAsBase64(photo: Photo): Promise<string> { //lee una foto como base64
    // Si la foto ya viene en base64, la devolvemos
    if (photo.format === 'jpeg' && photo.dataUrl) {
      return photo.dataUrl;
    }

    //si viene como URI, la leemos del filesystem
    if (photo.path) {
      const file = await Filesystem.readFile({
        path: photo.path,
      });
      return `data:image/jpeg;base64,${file.data}`;
    }

    // Si viene como webPath, la convertimos
    if (photo.webPath) {
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }

    throw new Error('No se pudo convertir la foto a base64');
  }

  async deletePhoto(filePath: string): Promise<void> { //elimina una foto del sistema de archivos dado su ruta
    try {
      await Filesystem.deleteFile({
        path: filePath,
        directory: Directory.Data,
      });
    } catch (error) {
      console.error('Error eliminando foto:', error);
      throw error;
    }
  }

  async getSavedPhotos(): Promise<any[]> { //obtiene la lista de fotos guardadas en el directiorio de datos
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Data,
      });

      return result.files.filter(file => file.name?.startsWith('photo_'));
    } catch (error) {
      console.error('Error obteniendo fotos guardadas:', error);
      return [];
    }
  }
}
