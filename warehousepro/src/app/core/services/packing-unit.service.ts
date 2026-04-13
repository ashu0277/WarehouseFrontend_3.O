import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { PackingUnit } from '../models/packing-unit.model';

/**
 * PackingUnitService - Handles packing unit API calls
 */
@Injectable({
  providedIn: 'root'
})
export class PackingUnitService extends BaseApiService<PackingUnit> {
  protected override endpoint = 'packingunit';
}
