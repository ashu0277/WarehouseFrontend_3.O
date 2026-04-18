import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PackingUnitService } from '../../core/services/packing-unit.service';
import { OrderService } from '../../core/services/order.service';
import { PackingUnit } from '../../core/models/packing-unit.model';
import { Order } from '../../core/models/order.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-packing-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.css']
})
export class PackingListComponent implements OnInit {
  private packingService = inject(PackingUnitService);
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);
 
  packs: PackingUnit[] = [];
  filteredPacks: PackingUnit[] = [];
  orders: Order[] = [];
  packForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  showStatusModal = false;
  isEditMode = false;
  selectedPack: PackingUnit | null = null;
 
  searchTerm = '';
  statusFilter = '';
 
  constructor() {
    this.packForm = this.fb.group({
      packingUnitID: [0],
      orderID: ['', Validators.required],
      packageType: ['Box', Validators.required],
      weight: [0, Validators.min(0)],
      dimensions: [''],
      status: [0]
    });
  }
 
  ngOnInit() {
    this.loadPacks();
    this.loadOrders();
  }
 
  loadPacks() {
    this.packingService.getAll().subscribe({
      next: (data) => {
        this.packs = data;
        this.filteredPacks = data;
      },
      error: (err) => console.error('Error loading packing units', err)
    });
  }
 
  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error('Error loading orders', err)
    });
  }
 
  filterPacks() {
    this.filteredPacks = this.packs.filter(p => {
      const matchesSearch = !this.searchTerm ||
        p.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || p.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
 
  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredPacks = this.packs;
  }
 
  openCreateModal() {
    this.isEditMode = false;
    this.packForm.reset({ packingUnitID: 0, packageType: 'Box', weight: 0 });
    this.showModal = true;
  }
 
  openEditModal(pack: PackingUnit) {
    this.isEditMode = true;
    this.selectedPack = pack;
    this.packForm.patchValue(pack);
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
    this.packForm.reset();
    this.selectedPack = null;
  }
 
  openStatusModal(pack: PackingUnit) {
    this.selectedPack = pack;
    const statusValue = pack.status === 'Packed' ? 0 : 1;
    this.packForm.patchValue({ status: statusValue });
    this.showStatusModal = true;
  }
 
  closeStatusModal() {
    this.showStatusModal = false;
    this.selectedPack = null;
  }
 
  updateStatus() {
    if (!this.selectedPack) return;
 
    const updateData = {
      Status: parseInt(this.packForm.value.status)
    } as any;
 
    this.packingService.update(this.selectedPack.packID, updateData).subscribe({
      next: () => {
        this.loadPacks();
        this.closeStatusModal();
      },
      error: (err) => console.error('Error updating status', err)
    });
  }
 
  savePack() {
    if (this.packForm.invalid) {
      this.packForm.markAllAsTouched();
      return;
    }
 
    const packData = this.packForm.value;
 
    if (this.isEditMode && this.selectedPack) {
      this.packingService.update(this.selectedPack.packID, packData).subscribe({
        next: () => {
          this.loadPacks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating pack', err)
      });
    } else {
      this.packingService.create(packData).subscribe({
        next: () => {
          this.loadPacks();
          this.closeModal();
        },
        error: (err) => console.error('Error creating pack', err)
      });
    }
  }
 
  confirmDelete(pack: PackingUnit) {
    this.selectedPack = pack;
    this.showDeleteDialog = true;
  }
 
  deletePack() {
    if (this.selectedPack) {
      this.packingService.delete(this.selectedPack.packID).subscribe({
        next: () => {
          this.loadPacks();
          this.showDeleteDialog = false;
          this.selectedPack = null;
        },
        error: (err) => console.error('Error deleting pack', err)
      });
    }
  }
}
 
 