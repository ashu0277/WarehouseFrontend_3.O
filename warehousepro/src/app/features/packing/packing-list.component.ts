import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PackingUnitService } from '../../core/services/packing-unit.service';
import { PackingUnit } from '../../core/models/packing-unit.model';
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
  private fb = inject(FormBuilder);

  packs: PackingUnit[] = [];
  filteredPacks: PackingUnit[] = [];
  packForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
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
      dimensions: ['']
    });
  }

  ngOnInit() {
    this.loadPacks();
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

  savePack() {
    if (this.packForm.invalid) {
      this.packForm.markAllAsTouched();
      return;
    }

    const packData = this.packForm.value;

    if (this.isEditMode && this.selectedPack) {
      this.packingService.update(this.selectedPack.packingUnitID, packData).subscribe({
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
      this.packingService.delete(this.selectedPack.packingUnitID).subscribe({
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
