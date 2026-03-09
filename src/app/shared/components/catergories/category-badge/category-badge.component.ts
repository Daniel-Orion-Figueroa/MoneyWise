import { Component, Input } from '@angular/core';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';

@Component({
  selector: 'app-category-badge',
  templateUrl: './category-badge.component.html',
  styleUrls: ['./category-badge.component.scss'],
  standalone: false
})
export class CategoryBadgeComponent {
  @Input() categoryId!: string;
  @Input() showIcon: boolean = true;

  getCategoryInfo() {
    return DEFAULT_CATEGORIES.find(cat => cat.id === this.categoryId);
  }

  getCategoryName(): string {
    const category = this.getCategoryInfo();
    return category ? category.name : 'Sin categoría';
  }

  getCategoryColor(): string {
    const category = this.getCategoryInfo();
    return category ? category.color : '#999999';
  }

  getCategoryIcon(): string {
    const category = this.getCategoryInfo();
    return category ? category.icon : 'help-outline';
  }
}
