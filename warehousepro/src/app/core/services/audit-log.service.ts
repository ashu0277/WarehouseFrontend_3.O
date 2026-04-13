import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { AuditLog } from '../models/audit-log.model';

/**
 * AuditLogService - Handles audit log API calls
 */
@Injectable({
  providedIn: 'root'
})
export class AuditLogService extends BaseApiService<AuditLog> {
  protected override endpoint = 'auditlog';
}
