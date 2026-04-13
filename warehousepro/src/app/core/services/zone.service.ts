import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Zone } from '../models/zone.model';

/**
 * ZoneService - Handles all zone-related API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ZoneService extends BaseApiService<Zone> {
  protected override endpoint = 'zone';
}
