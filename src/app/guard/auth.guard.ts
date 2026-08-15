import { UserService } from '@Services/user/user.service';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
export const AuthGuard: CanActivateFn = (route, state) => {

   return inject(UserService).isAuthenticated()
    ? true
    : inject(Router).createUrlTree(['/login']);

    
};
