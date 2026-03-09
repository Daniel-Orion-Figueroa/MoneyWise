import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DEFAULT_CATEGORIES } from '../../../../core/constants/category.constants';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
  standalone: false
})
export class FilterBarComponent {

  @Input() tipoSeleccionado: string = 'all';
  @Input() categoriaSeleccionada: string = 'all';
  @Input() buscarTexto: string = '';
  
  @Output() onTipoChange = new EventEmitter<string>();
  @Output() onCategoriaChange = new EventEmitter<string>();
  @Output() onBuscarChange = new EventEmitter<string>();

  categories = DEFAULT_CATEGORIES;

  constructor() { }

  onTypeChange(event: any) {
    this.onTipoChange.emit(event.detail.value);
  }

  onCategoryChange(event: any) {
    this.onCategoriaChange.emit(event.detail.value);
  }

  onSearchChange(event: any) {
    this.onBuscarChange.emit(event.detail.value);
  }

}
