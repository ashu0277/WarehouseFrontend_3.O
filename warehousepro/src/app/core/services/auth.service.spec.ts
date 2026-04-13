import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../models/auth.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a spy for Router
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login successfully and store token', () => {
    const mockCredentials: LoginRequest = {
      username: 'testuser',
      password: 'password123'
    };

    const mockResponse: LoginResponse = {
      token: 'fake-jwt-token',
      user: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        role: 'Admin'
      }
    };

    service.login(mockCredentials).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(localStorage.getItem('token')).toBe('fake-jwt-token');
      expect(service.isAuthenticated()).toBe(true);
    });

    const req = httpMock.expectOne('https://localhost:7000/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear token', () => {
    localStorage.setItem('token', 'fake-token');
    
    service.logout();
    
    expect(localStorage.getItem('token')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should check if user has role', () => {
    const mockUser = {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      role: 'Admin'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    expect(service.hasRole('Admin')).toBe(true);
    expect(service.hasRole('Operator')).toBe(false);
  });
});
