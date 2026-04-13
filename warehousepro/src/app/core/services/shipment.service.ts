import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Shipment } from '../models/shipment.model';

/**
 * ShipmentService - Handles shipment API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ShipmentService extends BaseApiService<Shipment> {
  protected override endpoint = 'shipment';
}
