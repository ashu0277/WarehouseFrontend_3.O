// WarehouseReport model - matches WarehouseReportResponseDto
export interface WarehouseReport {
  reportID: number;
  scope: string;
  generatedDate: string;
  generatedByUserID: number;
  generatedByName: string;
  metrics?: ReportMetrics;
}

// ReportMetrics model - matches ReportMetricsDto
export interface ReportMetrics {
  pickRate: number;
  accuracyPct: number;
  orderCycleTime: number;
}
