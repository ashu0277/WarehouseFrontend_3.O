import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { WarehouseReportService } from '../../core/services/warehouse-report.service';
import { WarehouseReport } from '../../core/models/warehouse-report.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-report-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  private reportService = inject(WarehouseReportService);
  private fb = inject(FormBuilder);

  reports: WarehouseReport[] = [];
  reportForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  selectedReport: WarehouseReport | null = null;

  constructor() {
    this.reportForm = this.fb.group({
      reportID: [0],
      reportType: ['Inventory', Validators.required],
      generatedBy: ['', Validators.required],
      parameters: ['']
    });
  }

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getAll().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => console.error('Error loading reports', err)
    });
  }

  openCreateModal() {
    this.reportForm.reset({ reportID: 0, reportType: 'Inventory' });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.reportForm.reset();
  }

  generateReport() {
    if (this.reportForm.invalid) {
      this.reportForm.markAllAsTouched();
      return;
    }

    const reportData = this.reportForm.value;

    this.reportService.create(reportData).subscribe({
      next: () => {
        this.loadReports();
        this.closeModal();
      },
      error: (err) => console.error('Error generating report', err)
    });
  }

  confirmDelete(report: WarehouseReport) {
    this.selectedReport = report;
    this.showDeleteDialog = true;
  }

  deleteReport() {
    if (this.selectedReport) {
      this.reportService.delete(this.selectedReport.reportID).subscribe({
        next: () => {
          this.loadReports();
          this.showDeleteDialog = false;
          this.selectedReport = null;
        },
        error: (err) => console.error('Error deleting report', err)
      });
    }
  }
}
