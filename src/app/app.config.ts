
import { ApplicationConfig } from '@angular/core';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { bffInterceptor } from './interceptors/bff.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([bffInterceptor])
    )
  ]
};
