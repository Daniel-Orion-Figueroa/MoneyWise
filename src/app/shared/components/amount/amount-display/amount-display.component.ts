import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-amount-display',
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss'],
  standalone: false
})
export class AmountDisplayComponent {

  @Input() monto!: number;
  @Input() tipo: 'income' | 'expense' | 'neutral' = 'neutral';
  @Input() tamaño: 'small' | 'medium' | 'large' = 'medium';

  constructor() { }

  getAmountClass(): string {
    switch (this.tipo) {
      case 'income': return 'amount-income';
      case 'expense': return 'amount-expense';
      default: return 'amount-neutral';
    }
  }

  getAmountPrefix(): string {
    switch (this.tipo) {
      case 'income': return '+';
      case 'expense': return '-';
      default: return '';
    }
  }

  getSizeClass(): string {
    return `amount-${this.tamaño}`;
  }

}
