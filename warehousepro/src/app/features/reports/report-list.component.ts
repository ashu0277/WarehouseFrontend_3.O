import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { WarehouseReportService } from '../../core/services/warehouse-report.service';
import { WarehouseService } from '../../core/services/warehouse.service';
import { ZoneService } from '../../core/services/zone.service';
import { WarehouseReport } from '../../core/models/warehouse-report.model';
import { Warehouse } from '../../core/models/warehouse.model';
import { Zone } from '../../core/models/zone.model';
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
  private warehouseService = inject(WarehouseService);
  private zoneService = inject(ZoneService);
  private fb = inject(FormBuilder);
 
  reports: WarehouseReport[] = [];
  warehouses: Warehouse[] = [];
  zones: Zone[] = [];
  reportForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  selectedReport: WarehouseReport | null = null;
 
  constructor() {
    this.reportForm = this.fb.group({
      scope: ['', Validators.required],
      warehouseID: [null],
      zoneID: [null],
      periodFrom: [''],
      periodTo: ['']
    });
  }
 
  ngOnInit() {
    this.loadReports();
    this.loadWarehouses();
    this.loadZones();
  }
 
  loadReports() {
    this.reportService.getAll().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => console.error('Error loading reports', err)
    });
  }
 
  loadWarehouses() {
    this.warehouseService.getAll().subscribe({
      next: (data) => this.warehouses = data,
      error: (err) => console.error('Error loading warehouses', err)
    });
  }
 
  loadZones() {
    this.zoneService.getAll().subscribe({
      next: (data) => this.zones = data,
      error: (err) => console.error('Error loading zones', err)
    });
  }
 
  openCreateModal() {
    this.reportForm.reset({ scope: '' });
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
 
    const formValue = this.reportForm.value;
 
    const createData = {
      Scope: parseInt(formValue.scope),
      WarehouseID: formValue.warehouseID,
      ZoneID: formValue.zoneID,
      PeriodFrom: formValue.periodFrom || null,
      PeriodTo: formValue.periodTo || null
    } as any;
 
    this.reportService.create(createData).subscribe({
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
 