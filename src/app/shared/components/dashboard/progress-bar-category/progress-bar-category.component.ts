import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar-category',
  templateUrl: './progress-bar-category.component.html',
  styleUrls: ['./progress-bar-category.component.scss'],
  standalone: false
})
export class ProgressBarCategoryComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() categoria!: string;
  @Input() porcentaje!: number;
  @Input() color!: string;
  @Input() monto!: number;

  get colorClass(): string {
    // Convertir color hexadecimal a clase de Ionic
    const colorMap: { [key: string]: string } = {
      '#2dd36f': 'success',
      '#eb445a': 'danger', 
      '#3dc2ff': 'primary',
      '#92949c': 'medium',
      '#f4a442': 'warning',
      '#b342f4': 'tertiary',
      '#69717d': 'dark'
    };
    
    return colorMap[this.color] || 'primary';
  }

}
