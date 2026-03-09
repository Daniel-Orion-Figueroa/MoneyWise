import { Component, Input } from '@angular/core';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';

@Component({
  selector: 'app-category-icon',
  templateUrl: './category-icon.component.html',
  styleUrls: ['./category-icon.component.scss'],
  standalone: false
})
export class CategoryIconComponent {

  @Input() categoria!: string;
  @Input() tamaño: 'small' | 'medium' = 'medium';

  constructor() { }

  getCategoryInfo() {
    return DEFAULT_CATEGORIES.find((cat: any) => cat.name === this.categoria);
  }

  getCategoryIcon(): string {
    const category = this.getCategoryInfo();
    return category?.icon || 'help-outline';
  }

  getCategoryColor(): string {
    const category = this.getCategoryInfo();
    return category?.color || '#92949c';
  }

  getSizeClass(): string {
    return `icon-${this.tamaño}`;
  }

}
