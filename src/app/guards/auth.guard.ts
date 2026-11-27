
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {

  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(

    map(user => {
      // User is authenticated
      return true;
    }),

    catchError(() => {
      // User is not authenticated
      return of(router.createUrlTree(['/signin']));
    })

  );
};
