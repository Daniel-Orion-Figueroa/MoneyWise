import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { StorageService } from './storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Subjects para manejar el usuario actual y el estado de autenticación
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$: Observable<User | null> = this.userSubject.asObservable();

  private tokenSubject = new BehaviorSubject<string | null>(null);
  public token$: Observable<string | null> = this.tokenSubject.asObservable();

  constructor(private storage: StorageService) {
    this.storage.getUser().then((user) => {
      if (user) {
        this.userSubject.next(user);
      }
    });

    this.storage.getAuthToken().then((token) => {
      if (token) {
        this.tokenSubject.next(token);
      }
    });
  }

  /**
   * Devuelve el token almacenado consultando el storage.
   * El método también actualiza el subject interno para que
   * las escuchas reactivas se sincronicen.
   */
  async getStoredToken(): Promise<string | null> {
    const token = await this.storage.getAuthToken();
    if (token) {
      this.tokenSubject.next(token);
    }
    return token;
  }

  async register(user: Omit<User, 'id' | 'createdAt'>): Promise<User> { //registra y autentica a un nuevo usuario en el storage

    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    await this.storage.saveUser(newUser);
    this.userSubject.next(newUser);

    //genera token (simulado)
    const token = this.generateToken();
    await this.storage.saveAuthToken(token);
    this.tokenSubject.next(token);

    return newUser;
  }

  //intenta iniciar sesión con email y contraseña, si el usuario existe y la contraseña coincide, se actualiza el estado de autenticación y se guarda un token simulado (en el storage)
  async login(email: string, password: string): Promise<boolean> {

    const storedUser = await this.storage.getUser();
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      this.userSubject.next(storedUser);

      const token = this.generateToken();
      await this.storage.saveAuthToken(token);
      this.tokenSubject.next(token);

      return true;
    }

    return false;
  }

  async logout(): Promise<void> {//cerrar sesión: se limpia el estado de autenticación y se elimina el token
    this.userSubject.next(null);
    this.tokenSubject.next(null);
    await this.storage.removeAuthToken();
    //no remueve el usuario del storage para permitir relogin fácil
  }

  isAuthenticated(): boolean { //nos dice si hay un usuario autenticado verificando si hay un token presente
    return !!this.tokenSubject.value;
  }

  private generateToken(): string {//genera un token muy simple (simulación)
    return Math.random().toString(36).substring(2);
  }
}

