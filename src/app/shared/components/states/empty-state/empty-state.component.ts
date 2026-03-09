import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  standalone: false
})
export class EmptyStateComponent {

  @Input() mensaje: string = '';
  @Input() icono: string = 'folder-outline';
  @Input() accion: string = '';
  @Output() onAccionClick = new EventEmitter<void>();

  constructor() { }

  onActionClick() {
    this.onAccionClick.emit();
  }

}
