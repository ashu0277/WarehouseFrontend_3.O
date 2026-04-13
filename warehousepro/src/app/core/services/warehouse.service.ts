import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Warehouse } from '../models/warehouse.model';

/**
 * WarehouseService - Handles all warehouse-related API calls
 * Extends BaseApiService to inherit getAll, getById, create, update, delete
 */
@Injectable({
  providedIn: 'root'
})
export class WarehouseService extends BaseApiService<Warehouse> {
  // Set the API endpoint for warehouses (matches WarehouseController route)
  protected override endpoint = 'warehouse';
}
