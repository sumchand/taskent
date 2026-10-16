
import { inject } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';

import { CsrfTokenService } from '../services/csrf-token.service';

export const bffInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfService = inject(CsrfTokenService);

  const unsafeMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  const requiresCsrf = unsafeMethods.includes(req.method.toUpperCase());

  let headers = req.headers;

  const csrfToken = csrfService.getToken();

  if (requiresCsrf && csrfToken) {
    headers = headers.set('X-CSRF-TOKEN', csrfToken);
  }

  const updatedRequest = req.clone({
    withCredentials: true,
    headers
  });

  return next(updatedRequest);
};
