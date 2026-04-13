import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard - Protects routes from unauthorized access
 * This is a functional guard (standalone style)
 * Usage: Add to route like this: canActivate: [authGuard]
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (authService.isAuthenticated()) {
    // Check if route requires specific role
    const requiredRole = route.data['role'];
    
    if (requiredRole && !authService.hasRole(requiredRole)) {
      // User doesn't have required role, redirect to dashboard
      router.navigate(['/dashboard']);
      return false;
    }
    
    return true;
  }

  // Not authenticated, redirect to login
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
