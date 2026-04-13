import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { SlottingRule } from '../models/slotting-rule.model';

/**
 * SlottingRuleService - Handles slotting rule API calls
 */
@Injectable({
  providedIn: 'root'
})
export class SlottingRuleService extends BaseApiService<SlottingRule> {
  protected override endpoint = 'slottingrule';
}
