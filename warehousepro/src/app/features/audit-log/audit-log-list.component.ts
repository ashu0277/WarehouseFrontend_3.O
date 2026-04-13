import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditLogService } from '../../core/services/audit-log.service';
import { AuditLog } from '../../core/models/audit-log.model';

@Component({
  selector: 'app-audit-log-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audit-log-list.component.html',
  // styleUrls: ['./audit-log-list.component.css']
})
export class AuditLogListComponent implements OnInit {
  private auditService = inject(AuditLogService);
  logs: AuditLog[] = [];

  ngOnInit() {
    this.auditService.getAll().subscribe({
      next: (data) => {
        this.logs = data;
      },
      error: (err) => console.error('Error loading audit logs', err)
    });
  }
}
