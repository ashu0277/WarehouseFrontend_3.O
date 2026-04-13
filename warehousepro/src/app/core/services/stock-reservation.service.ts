import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { StockReservation } from '../models/stock-reservation.model';

/**
 * StockReservationService - Handles stock reservation API calls
 */
@Injectable({
  providedIn: 'root'
})
export class StockReservationService extends BaseApiService<StockReservation> {
  protected override endpoint = 'stockreservation';
}
