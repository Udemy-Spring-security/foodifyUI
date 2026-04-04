import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router,
    private keycloak: KeycloakService
  ) { }

  logout() {
    // Later we will call Auth0 / Keycloak logout here
    console.log('Logging out...');
    this.keycloak.logout(window.location.origin + '/login');
  }

}
