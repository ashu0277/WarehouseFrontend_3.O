import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { WarehouseReport } from '../models/warehouse-report.model';

/**
 * WarehouseReportService - Handles report generation API calls
 */
@Injectable({
  providedIn: 'root'
})
export class WarehouseReportService extends BaseApiService<WarehouseReport> {
  protected override endpoint = 'warehousereport';
}
