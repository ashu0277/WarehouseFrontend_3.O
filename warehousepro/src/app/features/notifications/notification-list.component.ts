import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../core/services/notification.service';
import { Notification } from '../../core/models/notification.model';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  // styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  private notificationService = inject(NotificationService);
  notifications: Notification[] = [];

  ngOnInit() {
    this.notificationService.getAll().subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (err) => console.error('Error loading notifications', err)
    });
  }
}
