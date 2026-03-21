import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private auth: AuthService) { }

  onLogin() {

    this.auth.loginWithRedirect({
      appState: {
        target: '/restaurants'
      }
    });
  }
}
