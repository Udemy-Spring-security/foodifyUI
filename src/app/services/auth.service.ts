import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private keycloak: KeycloakService) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  login() {
   this.keycloak.login({
      redirectUri: window.location.origin + '/restaurants',  // ← redirect here after login
    });
  }

  logout() {
    this.keycloak.logout(window.location.origin);
  }
}