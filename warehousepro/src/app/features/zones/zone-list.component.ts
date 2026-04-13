import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ZoneService } from '../../core/services/zone.service';
import { Zone } from '../../core/models/zone.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

/**
 * ZoneList Component - Complete CRUD for zones
 */
@Component({
  selector: 'app-zone-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
export class ZoneListComponent implements OnInit {
  private zoneService = inject(ZoneService);
  private fb = inject(FormBuilder);

  zones: Zone[] = [];
  filteredZones: Zone[] = [];
  zoneForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedZone: Zone | null = null;
  
  searchTerm = '';
  typeFilter = '';

  constructor() {
    this.zoneForm = this.fb.group({
      WarehouseID: [1, Validators.required],
      Name: ['', Validators.required],
      ZoneType: ['Storage', Validators.required]
    });
  }

  ngOnInit() {
    this.loadZones();
  }

  loadZones() {
    this.zoneService.getAll().subscribe({
      next: (data) => {
        this.zones = data;
        this.filteredZones = data;
      },
      error: (err) => console.error('Error loading zones', err)
    });
  }

  filterZones() {
    this.filteredZones = this.zones.filter(z => {
      const matchesSearch = !this.searchTerm || 
        z.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        z.warehouseName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesType = !this.typeFilter || 
        z.zoneType === this.typeFilter;
      
      return matchesSearch && matchesType;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.typeFilter = '';
    this.filteredZones = this.zones;
  }

  openCreateModal() {
    this.isEditMode = false;
    this.zoneForm.reset({ WarehouseID: 1, ZoneType: 'Storage' });
    this.showModal = true;
  }

  openEditModal(zone: Zone) {
    this.isEditMode = true;
    this.selectedZone = zone;
    this.zoneForm.patchValue({
      WarehouseID: zone.warehouseID,
      Name: zone.name,
      ZoneType: zone.zoneType
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.zoneForm.reset();
    this.selectedZone = null;
  }

  saveZone() {
    if (this.zoneForm.invalid) {
      this.zoneForm.markAllAsTouched();
      return;
    }

    const zoneData = this.zoneForm.value;

    if (this.isEditMode && this.selectedZone) {
      this.zoneService.update(this.selectedZone.zoneID, zoneData).subscribe({
        next: () => {
          this.loadZones();
          this.closeModal();
        },
        error: (err) => console.error('Error updating zone', err)
      });
    } else {
      this.zoneService.create(zoneData).subscribe({
        next: () => {
          this.loadZones();
          this.closeModal();
        },
        error: (err) => console.error('Error creating zone', err)
      });
    }
  }

  confirmDelete(zone: Zone) {
    this.selectedZone = zone;
    this.showDeleteDialog = true;
  }

  deleteZone() {
    if (this.selectedZone) {
      this.zoneService.delete(this.selectedZone.zoneID).subscribe({
        next: () => {
          this.loadZones();
          this.showDeleteDialog = false;
          this.selectedZone = null;
        },
        error: (err) => console.error('Error deleting zone', err)
      });
    }
  }
}
