import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../../../core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth-service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

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
  user$: Observable<User | null>;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    this.user$ = this.authService.user$;
  }

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

  async logout() {
  const alert = await this.alertController.create({
    header: 'Cerrar Sesión',
    message: '¿Estás seguro?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary'
      },
      {
        text: 'Cerrar Sesión',
        cssClass: 'danger',
        handler: () => {
          this.authService.logout().then(() => {
            this.router.navigate(['/auth/login']);
          });
        }
      }
    ]
  });

  await alert.present();
}

  get tabTitle(): string {
    return this.tabNames[this.currentTab] || 'Dashboard';
  }

  getUserName(): string {
    return '';
  }
}
