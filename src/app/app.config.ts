import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthHttpInterceptor, provideAuth0 } from '@auth0/auth0-angular';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // ✅ CRITICAL: Register the interceptor — without this, token never attaches
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    },

    provideAuth0({
      domain: "dev-fwqhp6ppro58ymcn.us.auth0.com",
      clientId: "y6x21mXr0USIUGD91oGq8w7J0n1wffkd",
      authorizationParams: {
        redirect_uri: window.location.origin,
        // ✅ Must exactly match your Auth0 API Identifier
        audience: "http://localhost:8081/orders",
        scope: "openid profile email order:read order:write, restaurant:delete"
      },

      httpInterceptor: {
        allowedList: [
          {
            // ✅ Port fixed to 8081, audience matches exactly
            uri: "http://localhost:8081/*",
            tokenOptions: {
              authorizationParams: {
                audience: "http://localhost:8081/orders"
              }
            }
          }
        ]
      }
    }),
  ]
};