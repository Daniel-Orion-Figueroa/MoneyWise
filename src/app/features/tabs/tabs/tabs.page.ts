import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../../core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth-service';

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
    private location: Location,
    private authService: AuthService
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
    const tab = event.detail?.tab;
    if (tab) {
      this.currentTab = tab;
    }
  }

  goBack() {
    this.location.back();
  }

  showBackButton(): boolean {
    return this.router.url !== '/tabs/dashboard';
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/auth/login']);
    });
  }

  get tabTitle(): string {
    return this.tabNames[this.currentTab] || 'Dashboard';
  }
}
