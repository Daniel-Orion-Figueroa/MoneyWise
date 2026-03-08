import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../../core/interfaces/user.interface';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: false
})
export class TabsPage implements OnInit {
  currentTab: string = 'dashboard';
  tabNames: { [key: string]: string } = {
    'dashboard': 'Dashboard',
    'transactions': 'Transacciones'
  };

  constructor(
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    // Inicial la tab actual basada en la URL
    this.updateCurrentTab();

    // Escuchar cambios de navegación
    this.router.events.subscribe(() => {
      this.updateCurrentTab();
    });
  }

  private updateCurrentTab() {
    const url = this.router.url;
    if (url.includes('transactions')) {
      this.currentTab = 'transactions';
    } else {
      this.currentTab = 'dashboard';
    }
  }

  onTabChange(event: any) {
    this.currentTab = event.detail.tab;
  }

  goBack() {
    this.location.back();
  }

  showBackButton() {
    
  }

  get tabTitle(): string {
    return this.tabNames[this.currentTab] || 'Dashboard';
  }
}
