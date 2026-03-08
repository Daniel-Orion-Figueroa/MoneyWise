import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
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
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  get nameError(): string | null {
    const control = this.registerForm.get('name');
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'El nombre es requerido.';
      if (control.errors?.['minlength']) return 'El nombre debe tener al menos 2 caracteres.';
    }
    return null;
  }

  get emailError(): string | null {
    const control = this.registerForm.get('email');
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'El email es requerido.';
      if (control.errors?.['email']) return 'Ingresa un email válido.';
    }
    return null;
  }

  get passwordError(): string | null {
    const control = this.registerForm.get('password');
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'La contraseña es requerida.';
      if (control.errors?.['minlength']) return 'La contraseña debe tener al menos 6 caracteres.';
    }
    return null;
  }

  get confirmPasswordError(): string | null {
    const control = this.registerForm.get('confirmPassword');
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) return 'La confirmación de contraseña es requerida.';
    }
    return null;
  }

  get passwordMismatchError(): string | null {
    if (!this.passwordsMatch && this.registerForm.get('confirmPassword')?.touched && this.registerForm.get('password')?.touched) {
      return 'Las contraseñas no coinciden.';
    }
    return null;
  }

  get passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword && password && confirmPassword;
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.showToast('Por favor, completa todos los campos correctamente');
      return;
    }

    if (!this.passwordsMatch) {
      this.showToast('Las contraseñas no coinciden');
      return;
    }

    this.isLoading = true;

    try {
      const { name, email, password } = this.registerForm.value;
      const user = await this.authService.register({ name, email, password });

      this.showToast('¡Cuenta creada exitosamente!', 'success');
      this.router.navigate(['/tabs']);
    } catch (error) {
      console.error('Error en registro:', error);
      await this.showAlert('Error', 'Ocurrió un error al crear la cuenta. Inténtalo de nuevo.');
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
