import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { ReplenishmentTask } from '../models/replenishment-task.model';

/**
 * ReplenishmentTaskService - Handles replenishment API calls
 */
@Injectable({
  providedIn: 'root'
})
export class ReplenishmentTaskService extends BaseApiService<ReplenishmentTask> {
  protected override endpoint = 'replenishmenttask';
}
