import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Notification } from '../models/notification.model';

/**
 * NotificationService - Handles notification API calls
 */
@Injectable({
  providedIn: 'root'
})
export class NotificationService extends BaseApiService<Notification> {
  protected override endpoint = 'notification';
}
