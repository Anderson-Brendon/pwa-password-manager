import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { inject } from '@angular/core';

export const authenticationGuard: CanActivateFn = () => {
  const authService : AuthenticationService = inject(AuthenticationService);

  if(!authService.isLoggedIn()){
    const router = inject(Router);
    router.navigate(['user-login']);
    return false;
  }
  else{
    return authService.loginOk;
  }
};
