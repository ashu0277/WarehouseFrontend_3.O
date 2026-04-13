import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse } from '../models/auth.model';

/**
 * AuthService - Handles user authentication
 * Manages login, logout, token storage, and user state
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // BehaviorSubject to track if user is logged in (reactive state)
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  
  // Observable that components can subscribe to
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  /**
   * Login user with email and password
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          // Save token to localStorage
          localStorage.setItem('token', response.token);
          // Save user info (convert backend response to user object)
          const user = {
            id: response.userID,
            name: response.name,
            email: response.email,
            role: response.role
          };
          localStorage.setItem('user', JSON.stringify(user));
          // Update authentication state
          this.isAuthenticatedSubject.next(true);
        })
      );
  }

  /**
   * Logout user - clear token and redirect to login
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /**
   * Check if user has a token
   */
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Get the stored JWT token
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Get current user information
   */
  getCurrentUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Check if user has a specific role
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.hasToken();
  }
}
