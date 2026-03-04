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
  @Input() tipo!: 'ingreso' | 'gasto' | 'saldo';
  @Input() icono!: string;

  get color() {
    switch (this.tipo) {
      case 'ingreso': return 'success';
      case 'gasto': return 'danger';
      default: return 'primary';
    }
  }

}
