import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth-service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  isLoading = false;
  private authSubscription?: Subscription;
  private routerSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.setupAuthListener();
    this.setupRouterListener();
  }

  private setupAuthListener() {
    // Escuchar cambios de autenticación para limpiar campos
    this.authSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        // Si el usuario se autentica, limpiar campos
        this.clearForm();
      }
    });
  }

  private setupRouterListener() {
    // Limpiar campos cuando el usuario navega a la página de login
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.urlAfterRedirects === '/auth/login' || event.url === '/auth/login') {
        this.clearForm();
      }
    });
  }

  private clearForm() {
    this.loginForm.reset({
      email: '',
      password: ''
    });
  }

  ngOnDestroy() {
    // Limpiar suscripciones al destruir el componente
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get emailError(): string | null {
    const control = this.loginForm.get('email');
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'El email es requerido.';
      if (control.errors?.['email']) return 'Ingresa un email válido.';
    }
    return null;
  }

  get passwordError(): string | null {
    const control = this.loginForm.get('password');
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'La contraseña es requerida.';
      if (control.errors?.['minlength']) return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.showToast('Por favor, completa todos los campos correctamente');
      return;
    }

    this.isLoading = true;

    try {
      const { email, password } = this.loginForm.value;
      const success = await this.authService.login(email, password);

      if (success) {
        this.showToast('¡Bienvenido!', 'success');
        this.router.navigate(['/tabs']);
      } else {
        await this.showAlert('Error', 'Credenciales incorrectas. Verifica tu email y contraseña.');
      }
    } catch (error) {
      console.error('Error en login:', error);
      await this.showAlert('Error', 'Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      this.isLoading = false;
    }
  }

  private async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
