import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { BinLocation } from '../models/bin-location.model';

/**
 * BinLocationService - Handles all bin location API calls
 */
@Injectable({
  providedIn: 'root'
})
export class BinLocationService extends BaseApiService<BinLocation> {
  protected override endpoint = 'binlocation';
}
