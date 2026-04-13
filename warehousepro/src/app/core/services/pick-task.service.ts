import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { PickTask } from '../models/pick-task.model';

/**
 * PickTaskService - Handles picking task API calls
 */
@Injectable({
  providedIn: 'root'
})
export class PickTaskService extends BaseApiService<PickTask> {
  protected override endpoint = 'picktask';
}
