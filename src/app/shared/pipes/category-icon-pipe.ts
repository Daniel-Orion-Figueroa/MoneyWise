import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_CATEGORIES } from '../../core/constants/category.constants';
import { StorageService } from '../../core/services/storage-service';

@Pipe({
  name: 'categoryIconPipe',
  standalone: false
})
export class CategoryIconPipe implements PipeTransform {

  constructor(private storage: StorageService) {}

  async transform(categoryId: string): Promise<string> { //obtiene las categorias o usa las de por defecto
    const categories = await this.storage.getCategories();
    let allCategories;
    
    if (categories.length > 0) {
      allCategories = categories;
    } else {
      allCategories = DEFAULT_CATEGORIES;
    }

    // busca la categoria por id y devuelve el icono
    const category = allCategories.find(c => c.id === categoryId);
    
    if (category) {
      return category.icon;
    } else {
      return 'help-outline';
    }
  }

}
