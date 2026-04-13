import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { BinLocationService } from '../../core/services/bin-location.service';
import { BinLocation } from '../../core/models/bin-location.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bin-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './bin-list.component.html',
  styleUrls: ['./bin-list.component.css']
})
export class BinListComponent implements OnInit {
  private binService = inject(BinLocationService);
  private fb = inject(FormBuilder);

  bins: BinLocation[] = [];
  filteredBins: BinLocation[] = [];
  binForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedBin: BinLocation | null = null;
  
  searchTerm = '';
  statusFilter = '';

  constructor() {
    this.binForm = this.fb.group({
      ZoneID: [1, Validators.required],
      Code: ['', Validators.required],
      Capacity: [100, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadBins();
  }

  loadBins() {
    this.binService.getAll().subscribe({
      next: (data) => {
        this.bins = data;
        this.filteredBins = data;
      },
      error: (err) => console.error('Error loading bins', err)
    });
  }

  filterBins() {
    this.filteredBins = this.bins.filter(b => {
      const matchesSearch = !this.searchTerm || 
        b.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.zoneName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        b.warehouseName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        b.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredBins = this.bins;
  }

  openCreateModal() {
    this.isEditMode = false;
    this.binForm.reset({ ZoneID: 1, Capacity: 100 });
    this.showModal = true;
  }

  openEditModal(bin: BinLocation) {
    this.isEditMode = true;
    this.selectedBin = bin;
    this.binForm.patchValue({
      ZoneID: bin.zoneID,
      Code: bin.code,
      Capacity: bin.capacity
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.binForm.reset();
    this.selectedBin = null;
  }

  saveBin() {
    if (this.binForm.invalid) {
      this.binForm.markAllAsTouched();
      return;
    }

    const binData = this.binForm.value;

    if (this.isEditMode && this.selectedBin) {
      this.binService.update(this.selectedBin.binID, binData).subscribe({
        next: () => {
          this.loadBins();
          this.closeModal();
        },
        error: (err) => console.error('Error updating bin', err)
      });
    } else {
      this.binService.create(binData).subscribe({
        next: () => {
          this.loadBins();
          this.closeModal();
        },
        error: (err) => console.error('Error creating bin', err)
      });
    }
  }

  confirmDelete(bin: BinLocation) {
    this.selectedBin = bin;
    this.showDeleteDialog = true;
  }

  deleteBin() {
    if (this.selectedBin) {
      this.binService.delete(this.selectedBin.binID).subscribe({
        next: () => {
          this.loadBins();
          this.showDeleteDialog = false;
          this.selectedBin = null;
        },
        error: (err) => console.error('Error deleting bin', err)
      });
    }
  }
}
