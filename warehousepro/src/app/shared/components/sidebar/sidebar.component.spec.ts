/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../../core/services/auth.service';
import { RouterModule } from '@angular/router';

// ...existing code...
describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['hasRole', 'getCurrentUser']);

    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterModule.forRoot([])],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.getCurrentUser.and.returnValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      role: 'Admin',
      isActive: true
    });

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar collapse', () => {
    expect(component.isCollapsed).toBe(false);
    component.toggleSidebar();
    expect(component.isCollapsed).toBe(true);
    component.toggleSidebar();
    expect(component.isCollapsed).toBe(false);
  });

  it('should check user role', () => {
    authServiceSpy.hasRole.and.returnValue(true);
    expect(component.hasRole('Admin')).toBe(true);
    expect(authServiceSpy.hasRole).toHaveBeenCalledWith('Admin');
  });

  it('should check if user has any role', () => {
    authServiceSpy.hasRole.and.callFake((role: string) => role === 'Admin');
    expect(component.hasAnyRole(['Admin', 'Manager'])).toBe(true);
    expect(component.hasAnyRole(['Operator', 'Viewer'])).toBe(false);
  });
});
