import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { from, Observable, of } from 'rxjs';

export interface UserProfile {
  name: string;
  email: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private keycloak: KeycloakService) {}

  // ✅ returns boolean directly — no Promise, no Observable
  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }

  getUser(): Observable<UserProfile> {
    const token = this.keycloak.getKeycloakInstance().tokenParsed;
    return of({
      name:     token?.['name']               ?? 'Unknown',
      email:    token?.['email']              ?? '',
      username: token?.['preferred_username'] ?? '',
    });
  }

  getToken(): Observable<string> {
    return from(this.keycloak.getToken());
  }

  login() {
   this.keycloak.login({
      redirectUri: window.location.origin + '/restaurants',  // ← redirect here after login
    });
  }

  logout() {
    this.keycloak.logout(window.location.origin);
  }

  hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role);
  }
}