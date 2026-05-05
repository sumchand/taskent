import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router'; // ✅ missing import
import { App } from './app/app';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    ...(appConfig.providers || []) // ✅ merge config providers
  ]
})
.catch((err) => console.error(err));