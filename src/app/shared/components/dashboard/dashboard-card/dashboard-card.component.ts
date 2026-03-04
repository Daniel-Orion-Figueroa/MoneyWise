import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss'],
  standalone: false
})
export class DashboardCardComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  @Input() titulo!: string;
  @Input() monto!: number;
  @Input() tipo!: 'income' | 'expense' | 'balance';
  @Input() icono!: string;

  get color() {
    switch (this.tipo) {
      case 'income': return 'success';
      case 'expense': return 'danger';
      default: return 'primary';
    }
  }

}
