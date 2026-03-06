import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
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
