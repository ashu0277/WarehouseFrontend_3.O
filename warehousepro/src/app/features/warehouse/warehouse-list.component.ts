import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse.service';
import { Warehouse } from '../../core/models/warehouse.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
/**
 * WarehouseList Component - Displays and manages warehouses
 * Features: List, Create, Edit, Delete with modal forms
 */
@Component({
  selector: 'app-warehouse-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  private warehouseService = inject(WarehouseService);
  private fb = inject(FormBuilder);

  warehouses: Warehouse[] = [];
  filteredWarehouses: Warehouse[] = [];
  warehouseForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedWarehouse: Warehouse | null = null;
  
  searchTerm = '';
  statusFilter = '';

  constructor() {
    // Initialize form with validation - matches backend WarehouseCreateDto
    this.warehouseForm = this.fb.group({
      warehouseID: [0],
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadWarehouses();
  }

  /**
   * Load all warehouses from API
   */
  loadWarehouses() {
    this.warehouseService.getAll().subscribe({
      next: (data) => {
        this.warehouses = data;
        this.filteredWarehouses = data;
      },
      error: (err) => console.error('Error loading warehouses', err)
    });
  }

  /**
   * Filter warehouses based on search term and status
   */
  filterWarehouses() {
    this.filteredWarehouses = this.warehouses.filter(w => {
      const matchesSearch = !this.searchTerm || 
        w.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        w.location.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        w.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  /**
   * Reset all filters
   */
  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredWarehouses = this.warehouses;
  }

  /**
   * Open modal for creating new warehouse
   */
  openCreateModal() {
    this.isEditMode = false;
    this.warehouseForm.reset({ warehouseID: 0 });
    this.showModal = true;
  }

  /**
   * Open modal for editing existing warehouse
   */
  openEditModal(warehouse: Warehouse) {
    this.isEditMode = true;
    this.selectedWarehouse = warehouse;
    this.warehouseForm.patchValue(warehouse);
    this.showModal = true;
  }

  /**
   * Close modal
   */
  closeModal() {
    this.showModal = false;
    this.warehouseForm.reset();
    this.selectedWarehouse = null;
  }

  /**
   * Save warehouse (create or update)
   */
  saveWarehouse() {
    if (this.warehouseForm.invalid) {
      this.warehouseForm.markAllAsTouched();
      return;
    }

    const warehouseData = this.warehouseForm.value;

    if (this.isEditMode && this.selectedWarehouse) {
      // Update existing warehouse
      this.warehouseService.update(this.selectedWarehouse.warehouseID, warehouseData).subscribe({
        next: () => {
          this.loadWarehouses();
          this.closeModal();
        },
        error: (err) => console.error('Error updating warehouse', err)
      });
    } else {
      // Create new warehouse
      this.warehouseService.create(warehouseData).subscribe({
        next: () => {
          this.loadWarehouses();
          this.closeModal();
        },
        error: (err) => console.error('Error creating warehouse', err)
      });
    }
  }

  /**
   * Show delete confirmation dialog
   */
  confirmDelete(warehouse: Warehouse) {
    this.selectedWarehouse = warehouse;
    this.showDeleteDialog = true;
  }

  /**
   * Delete warehouse
   */
  deleteWarehouse() {
    if (this.selectedWarehouse) {
      this.warehouseService.delete(this.selectedWarehouse.warehouseID).subscribe({
        next: () => {
          this.loadWarehouses();
          this.showDeleteDialog = false;
          this.selectedWarehouse = null;
        },
        error: (err) => console.error('Error deleting warehouse', err)
      });
    }
  }
}
