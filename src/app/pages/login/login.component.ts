import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  onLogin() {
    // Later we will redirect to Auth0 / Keycloak here
    console.log('Login clicked');
  }
}
