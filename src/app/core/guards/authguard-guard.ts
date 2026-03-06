import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth-service';

// guard puede devolver boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>
export const authguardGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // si ya tenemos token en memoria, no hay problema
  if (authService.isAuthenticated()) {
    return true;
  }

  // de lo contrario consultamos el storage antes de decidir
  const token = await authService.getStoredToken();
  if (token) {
    // el propio AuthService actualiza su subject cuando recupera el token
    return true;
  }

  // si no hay token redirigimos al login
  return router.createUrlTree(['/login']);
};
