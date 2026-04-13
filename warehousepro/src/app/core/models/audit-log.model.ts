// AuditLog model - matches backend AuditLog model
export interface AuditLog {
  auditID: number;
  userID: number;
  action: string;
  resource: string;
  timestamp: string;
  metadata?: string;
}
