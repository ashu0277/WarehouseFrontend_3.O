import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ItemService } from '../../core/services/item.service';
import { InventoryBalanceService } from '../../core/services/inventory-balance.service';
import { Item } from '../../core/models/item.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  private itemService = inject(ItemService);
  private inventoryService = inject(InventoryBalanceService);
  private fb = inject(FormBuilder);

  items: Item[] = [];
  filteredItems: Item[] = [];
  itemForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedItem: Item | null = null;
  
  searchTerm = '';
  statusFilter = '';

  constructor() {
    this.itemForm = this.fb.group({
      itemID: [0],
      sku: ['', Validators.required],
        totalQuantityOnHand: [0],
      description: [''],
      unitOfMeasure: ['EA', Validators.required]
    });
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
      },
      error: (err) => console.error('Error loading items', err)
    });
  }

  filterItems() {
    this.filteredItems = this.items.filter(i => {
      const matchesSearch = !this.searchTerm || 
        i.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (i.description && i.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
      
      const matchesStatus = !this.statusFilter || 
        i.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredItems = this.items;
  }

  openCreateModal() {
    this.isEditMode = false;
    this.itemForm.reset({ itemID: 0, unitOfMeasure: 'EA' });
    this.showModal = true;
  }

  openEditModal(item: Item) {
    this.isEditMode = true;
    this.selectedItem = item;
    this.itemForm.patchValue(item);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.itemForm.reset();
    this.selectedItem = null;
  }

  saveItem() {
    if (this.itemForm.invalid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const itemData = this.itemForm.value;

    if (this.isEditMode && this.selectedItem) {
      this.itemService.update(this.selectedItem.itemID, itemData).subscribe({
        next: () => {
          this.loadItems();
          this.closeModal();
        },
        error: (err) => console.error('Error updating item', err)
      });
    } else {
      this.itemService.create(itemData).subscribe({
        next: () => {
          this.loadItems();
          this.closeModal();
        },
        error: (err) => console.error('Error creating item', err)
      });
    }
  }

  confirmDelete(item: Item) {
    this.selectedItem = item;
    this.showDeleteDialog = true;
  }

  deleteItem() {
    if (this.selectedItem) {
      this.itemService.delete(this.selectedItem.itemID).subscribe({
        next: () => {
          this.loadItems();
          this.showDeleteDialog = false;
          this.selectedItem = null;
        },
        error: (err) => console.error('Error deleting item', err)
      });
    }
  }
}
