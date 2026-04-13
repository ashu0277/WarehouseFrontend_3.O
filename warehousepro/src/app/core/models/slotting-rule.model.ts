// SlottingRule model - matches SlottingRuleResponseDto
export interface SlottingRule {
  ruleID: number;
  criterion: string;
  priority: number;
  description?: string;
  status: string;
  createdAt: string;
}
