import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { InboundReceipt } from '../models/inbound-receipt.model';

/**
 * InboundReceiptService - Handles incoming shipment API calls
 */
@Injectable({
  providedIn: 'root'
})
export class InboundReceiptService extends BaseApiService<InboundReceipt> {
  protected override endpoint = 'inboundreceipt';
}
