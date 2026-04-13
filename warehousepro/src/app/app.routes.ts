import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './shared/layouts/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout.component';

/**
 * Application Routes
 * Uses lazy loading with loadComponent for better performance
 * Auth routes use AuthLayout, protected routes use MainLayout
 */
export const routes: Routes = [
  // Redirect root to login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Auth routes (no authentication required)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent)
      }
    ]
  },

  // Protected routes (authentication required)
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      // Dashboard
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },

      // Layout Management
      {
        path: 'warehouses',
        loadComponent: () => import('./features/warehouse/warehouse-list.component').then(m => m.WarehouseListComponent)
      },
      {
        path: 'zones',
        loadComponent: () => import('./features/zones/zone-list.component').then(m => m.ZoneListComponent)
      },
      {
        path: 'bins',
        loadComponent: () => import('./features/bins/bin-list.component').then(m => m.BinListComponent)
      },
      {
        path: 'items',
        loadComponent: () => import('./features/items/item-list.component').then(m => m.ItemListComponent)
      },

      // Operations
      {
        path: 'inbound',
        loadComponent: () => import('./features/inbound/inbound-list.component').then(m => m.InboundListComponent)
      },
      {
        path: 'putaway',
        loadComponent: () => import('./features/putaway/putaway-list.component').then(m => m.PutAwayListComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/inventory/inventory-list.component').then(m => m.InventoryListComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/orders/order-list.component').then(m => m.OrderListComponent)
      },
      {
        path: 'picking',
        loadComponent: () => import('./features/picking/picking-list.component').then(m => m.PickingListComponent)
      },
      {
        path: 'packing',
        loadComponent: () => import('./features/packing/packing-list.component').then(m => m.PackingListComponent)
      },
      {
        path: 'shipments',
        loadComponent: () => import('./features/shipments/shipment-list.component').then(m => m.ShipmentListComponent)
      },

      // Advanced Features
      {
        path: 'replenishment',
        loadComponent: () => import('./features/replenishment/replenishment-list.component').then(m => m.ReplenishmentListComponent)
      },
      {
        path: 'slotting',
        loadComponent: () => import('./features/slotting/slotting-list.component').then(m => m.SlottingListComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/report-list.component').then(m => m.ReportListComponent)
      },
      {
        path: 'notifications',
        loadComponent: () => import('./features/notifications/notification-list.component').then(m => m.NotificationListComponent)
      },

      // Admin Only
      {
        path: 'users',
        loadComponent: () => import('./features/users/user-list.component').then(m => m.UserListComponent),
        canActivate: [authGuard],
        data: { role: 'Admin' }
      },
      {
        path: 'audit-log',
        loadComponent: () => import('./features/audit-log/audit-log-list.component').then(m => m.AuditLogListComponent),
        canActivate: [authGuard],
        data: { role: 'Admin' }
      }
    ]
  },

  // Wildcard route - 404 page
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
