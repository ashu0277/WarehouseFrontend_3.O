import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/**
 * Sidebar - Navigation menu with role-based access control
 * Roles: Operator, Supervisor, Inventory Planner, Logistics Coordinator, Admin
 */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  authService = inject(AuthService);
  isCollapsed = false;

  currentUser = this.authService.getCurrentUser();
  userRole = this.currentUser?.role || '';

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // Role-based access checks
  isOperator(): boolean {
    return this.userRole === 'Operator';
  }

  isSupervisor(): boolean {
    return this.userRole === 'Supervisor';
  }

  isInventoryPlanner(): boolean {
    return this.userRole === 'Inventory Planner';
  }

  isLogisticsCoordinator(): boolean {
    return this.userRole === 'Logistics Coordinator';
  }

  isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  // Combined role checks
  canAccessInbound(): boolean {
    return this.isOperator() || this.isSupervisor() || this.isAdmin();
  }

  canAccessPutAway(): boolean {
    return this.isOperator() || this.isSupervisor() || this.isAdmin();
  }

  canAccessPicking(): boolean {
    return this.isOperator() || this.isSupervisor() || this.isLogisticsCoordinator() || this.isAdmin();
  }

  canAccessPacking(): boolean {
    return this.isOperator() || this.isSupervisor() || this.isLogisticsCoordinator() || this.isAdmin();
  }

  canAccessShipments(): boolean {
    return this.isOperator() || this.isSupervisor() || this.isLogisticsCoordinator() || this.isAdmin();
  }

  canAccessInventory(): boolean {
    return this.isSupervisor() || this.isInventoryPlanner() || this.isAdmin();
  }

  canAccessItems(): boolean {
    return this.isInventoryPlanner() || this.isAdmin();
  }

  canAccessReplenishment(): boolean {
    return this.isInventoryPlanner() || this.isAdmin();
  }

  canAccessSlotting(): boolean {
    return this.isInventoryPlanner() || this.isAdmin();
  }

  canAccessOrders(): boolean {
    return this.isLogisticsCoordinator() || this.isSupervisor() || this.isAdmin();
  }

  canAccessReports(): boolean {
    return this.isSupervisor() || this.isInventoryPlanner() || this.isLogisticsCoordinator() || this.isAdmin();
  }

  canAccessWarehouseLayout(): boolean {
    return this.isAdmin();
  }

  canAccessUsers(): boolean {
    return this.isAdmin();
  }

  canAccessAuditLog(): boolean {
    return this.isAdmin();
  }
}
