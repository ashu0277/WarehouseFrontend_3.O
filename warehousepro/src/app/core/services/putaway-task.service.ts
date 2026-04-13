import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { PutAwayTask } from '../models/putaway-task.model';

/**
 * PutAwayTaskService - Handles put-away task API calls
 */
@Injectable({
  providedIn: 'root'
})
export class PutAwayTaskService extends BaseApiService<PutAwayTask> {
  protected override endpoint = 'putawaytask';
}
