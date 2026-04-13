import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Notification } from '../../../core/models/notification.model';

/**
 * Navbar - Top navigation bar with notifications and user menu
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  notificationService = inject(NotificationService);

  currentUser = this.authService.getCurrentUser();
  notifications: Notification[] = [];
  unreadCount = 0;
  showNotifications = false;
  showUserMenu = false;

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    // Load notifications for current user
    this.notificationService.getAll().subscribe({
      next: (data) => {
        this.notifications = data.slice(0, 5); // Show only 5 recent
        this.unreadCount = data.filter(n => !n.status).length;
      },
      error: (err) => console.error('Error loading notifications', err)
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
    this.showUserMenu = false;
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
    this.showNotifications = false;
  }

  logout() {
    this.authService.logout();
  }

  getUserInitials(): string {
    if (!this.currentUser?.name) return 'U';
    const names = this.currentUser.name.split(' ');
    if (names.length >= 2) {
      return names[0].charAt(0) + names[1].charAt(0);
    }
    return this.currentUser.name.charAt(0);
  }
}
