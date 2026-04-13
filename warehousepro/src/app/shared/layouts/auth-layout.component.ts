import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * AuthLayout - Simple layout for login and registration pages
 * No sidebar or navbar, just centered content
 */
@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="auth-wrapper">
      <div class="auth-container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .auth-container {
      width: 100%;
      max-width: 450px;
      padding: 20px;
    }
  `]
})
export class AuthLayoutComponent {}
