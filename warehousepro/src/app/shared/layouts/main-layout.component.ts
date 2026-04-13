import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';

/**
 * MainLayout - Layout for authenticated users
 * Includes sidebar, navbar, and content area
 */
@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, NavbarComponent],
  template: `
    <div class="wrapper">
      <!-- Sidebar -->
      <app-sidebar></app-sidebar>
      
      <!-- Main content area -->
      <div class="main-content">
        <!-- Top navbar -->
        <app-navbar></app-navbar>
        
        <!-- Page content -->
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .wrapper {
      display: flex;
      min-height: 100vh;
      height: 100vh;
      overflow: hidden;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #f8f9fa;
      overflow: hidden;
    }

    .content-wrapper {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      height: calc(100vh - 60px);
    }
  `]
})
export class MainLayoutComponent {}
