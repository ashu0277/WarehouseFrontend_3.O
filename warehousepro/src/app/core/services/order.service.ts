import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Order } from '../models/order.model';

/**
 * OrderService - Handles customer order API calls
 */
@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseApiService<Order> {
  protected override endpoint = 'order';
}
