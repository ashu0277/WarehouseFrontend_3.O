import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { Item } from '../models/item.model';

/**
 * ItemService - Handles all item/product API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ItemService extends BaseApiService<Item> {
  protected override endpoint = 'item';
}
