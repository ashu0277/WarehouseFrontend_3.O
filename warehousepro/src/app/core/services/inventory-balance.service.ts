import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { InventoryBalance } from '../models/inventory-balance.model';

/**
 * InventoryBalanceService - Handles inventory tracking API calls
 */
@Injectable({
  providedIn: 'root'
})
export class InventoryBalanceService extends BaseApiService<InventoryBalance> {
  protected override endpoint = 'inventorybalance';
}
