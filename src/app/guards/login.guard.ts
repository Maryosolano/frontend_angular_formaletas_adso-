import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { GeneralService } from '../services/general.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const generalService = inject(GeneralService);

  const token = localStorage.getItem('token');
  const isvalid = generalService.isAuthenticated();
  
  if (token && isvalid) {
    // token presente y no expirado: permitir acceso
    return true;
  }
  // token ausente o expirado: redirigir a /login
  return router.parseUrl('/login') as unknown as boolean | UrlTree;
};
