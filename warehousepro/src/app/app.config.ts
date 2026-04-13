import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';

/**
 * Application Configuration
 * Standalone Angular app configuration
 * Registers all providers needed for the application
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Enable zone-based change detection with optimized event coalescing
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Provide router with our routes
    provideRouter(routes),
    
    // Provide HTTP client with JWT interceptor
    // The interceptor automatically adds JWT token to all HTTP requests
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
};
