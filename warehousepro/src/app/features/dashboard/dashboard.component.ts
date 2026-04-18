import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs'; // Import this for cleaner multiple API calls
import { AuthService } from '../../core/services/auth.service';
import { OrderService } from '../../core/services/order.service';
import { InventoryBalanceService } from '../../core/services/inventory-balance.service';
import { ReplenishmentTaskService } from '../../core/services/replenishment-task.service';
import { ShipmentService } from '../../core/services/shipment.service'; // Assuming you have this
import { Order } from '../../core/models/order.model';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusBadgeComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  private inventoryService = inject(InventoryBalanceService);
  private replenishmentService = inject(ReplenishmentTaskService);
  private shipmentService = inject(ShipmentService); 
  private router = inject(Router);

  currentUser = this.authService.getCurrentUser();
  recentOrders: Order[] = [];

  kpis = {
    totalInventory: 0,
    pendingOrders: 0,
    activeTasks: 0,
    shipmentsToday: 0,
    completedShipments: 0
  };

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // 1. Load Orders & Calculate Order KPIs
    this.orderService.getAll().subscribe({
      next: (orders) => {
        // Sort by date (assuming createdAt exists) and take top 10
        this.recentOrders = [...orders]
          .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
          .slice(0, 10);
        
        this.kpis.pendingOrders = orders.filter(o => o.status === 'Pending').length;
      },
      error: (err) => console.error('Error loading orders', err)
    });

    // 2. Load Inventory & Calculate Total Stock
    this.inventoryService.getAll().subscribe({
      next: (inventory) => {
        this.kpis.totalInventory = inventory.reduce((sum, item) => sum + item.quantityOnHand, 0);
      },
      error: (err) => console.error('Error loading inventory', err)
    });

    // 3. Load Real Replenishment Tasks
    this.replenishmentService.getAll().subscribe({
      next: (tasks) => {
        // Active tasks are usually anything not 'Completed'
        this.kpis.activeTasks = tasks.filter(t => t.status !== 'Completed').length;
      },
      error: (err) => console.error('Error loading tasks', err)
    });

    // 4. Load Real Shipments
    this.shipmentService.getAll().subscribe({
      next: (shipments) => {
        const today = new Date().toISOString().split('T')[0];
        
        this.kpis.shipmentsToday = shipments.filter(s => 
          s.  createdAt?.toString().startsWith(today)
        ).length;

        this.kpis.completedShipments = shipments.filter(s => 
          s.status === 'Shipped' || s.status === 'Delivered'
        ).length;
      },
      error: (err) => console.error('Error loading shipments', err)
    });
  }

  canGenerateReports(): boolean {
    const role = this.currentUser?.role;
    const allowedRoles = ['Admin', 'Supervisor', 'Inventory Planner', 'Logistics Coordinator'];
    return !!role && allowedRoles.includes(role);
  }

  refreshData() {
    this.loadDashboardData();
  }

  viewOrder(orderId: number) {
    this.router.navigate(['/orders', orderId]);
  }
}