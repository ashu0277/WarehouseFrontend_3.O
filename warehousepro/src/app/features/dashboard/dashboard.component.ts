import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { InventoryBalanceService } from '../../core/services/inventory-balance.service';
import { Order } from '../../core/models/order.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

/**
 * Dashboard Component - Main landing page after login
 * Shows KPIs, recent orders, and quick actions
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  authService = inject(AuthService);
  orderService = inject(OrderService);
  inventoryService = inject(InventoryBalanceService);
  router = inject(Router);

  currentUser = this.authService.getCurrentUser();

  canGenerateReports(): boolean {
    const role = this.currentUser?.role;
    return role === 'Admin' || role === 'Supervisor' || role === 'Inventory Planner' || role === 'Logistics Coordinator';
  }
  
  // KPI data
  kpis = {
    totalInventory: 0,
    pendingOrders: 0,
    urgentOrders: 0,
    activeTasks: 0,
    assignedToMe: 0,
    shipmentsToday: 0,
    completedShipments: 0
  };

  recentOrders: Order[] = [];

  ngOnInit() {
    this.loadDashboardData();
  }

  /**
   * Load all dashboard data
   */
  loadDashboardData() {
    // Load recent orders
    this.orderService.getAll().subscribe({
      next: (orders) => {
        this.recentOrders = orders.slice(0, 10); // Show 10 most recent
        this.kpis.pendingOrders = orders.filter(o => o.status === 'Pending').length;
        // this.kpis.urgentOrders = orders.filter(o => o. === 'Urgent').length;
      },
      error: (err) => console.error('Error loading orders', err)
    });

    // Load inventory data
    this.inventoryService.getAll().subscribe({
      next: (inventory) => {
        this.kpis.totalInventory = inventory.reduce((sum, item) => sum + item.quantityOnHand, 0);
      },
      error: (err) => console.error('Error loading inventory', err)
    });

    // Mock data for other KPIs (replace with real API calls)
    this.kpis.activeTasks = 15;
    this.kpis.assignedToMe = 5;
    this.kpis.shipmentsToday = 8;
    this.kpis.completedShipments = 6;
  }

  /**
   * Refresh dashboard data
   */
  refreshData() {
    this.loadDashboardData();
  }

  /**
   * Navigate to order details
   */
  viewOrder(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }
}
