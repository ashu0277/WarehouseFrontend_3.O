import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InventoryBalanceService } from '../../core/services/inventory-balance.service';
import { StockReservationService } from '../../core/services/stock-reservation.service';
import { ItemService } from '../../core/services/item.service';
import { BinLocationService } from '../../core/services/bin-location.service';
import { OrderService } from '../../core/services/order.service';
import { InventoryBalance } from '../../core/models/inventory-balance.model';
import { StockReservation } from '../../core/models/stock-reservation.model';
import { Item } from '../../core/models/item.model';
import { BinLocation } from '../../core/models/bin-location.model';
import { Order } from '../../core/models/order.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  private inventoryService = inject(InventoryBalanceService);
  private reservationService = inject(StockReservationService);
  private itemService = inject(ItemService);
  private binService = inject(BinLocationService);
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);
 
  inventory: InventoryBalance[] = [];
  filteredInventory: InventoryBalance[] = [];
  reservations: StockReservation[] = [];
  items: Item[] = [];
  bins: BinLocation[] = [];
  orders: Order[] = [];
  reservationForm: FormGroup;
 
  searchTerm = '';
  showReservationModal = false;
  showDeleteDialog = false;
  selectedReservation: StockReservation | null = null;
  activeTab: 'inventory' | 'reservations' = 'inventory';
 
  constructor() {
    this.reservationForm = this.fb.group({
      reservationID: [0],
      itemID: ['', Validators.required],
      binID: ['', Validators.required],
      referenceType: ['Order', Validators.required],
      referenceID: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }
 
  ngOnInit() {
    this.loadInventory();
    this.loadReservations();
    this.loadItems();
    this.loadBins();
    this.loadOrders();
  }
 
  loadInventory() {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.inventory = data;
        this.filteredInventory = data;
      },
      error: (err) => console.error('Error loading inventory', err)
    });
  }
 
  filterInventory() {
    this.filteredInventory = this.inventory.filter(i => {
      return !this.searchTerm ||
        i.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (i.itemDescription && i.itemDescription.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        i.binCode.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
 
  resetFilters() {
    this.searchTerm = '';
    this.filteredInventory = this.inventory;
  }
 
  loadReservations() {
    this.reservationService.getAll().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => console.error('Error loading reservations', err)
    });
  }
 
  loadItems() {
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.items = data;
      },
      error: (err) => console.error('Error loading items', err)
    });
  }
 
  loadBins() {
    this.binService.getAll().subscribe({
      next: (data) => {
        this.bins = data;
      },
      error: (err) => console.error('Error loading bins', err)
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
 
  switchTab(tab: 'inventory' | 'reservations') {
    this.activeTab = tab;
  }
 
  openReservationModal() {
    this.reservationForm.reset({
      reservationID: 0,
      referenceType: 'Order',
      quantity: 1
    });
    this.showReservationModal = true;
  }
 
  closeReservationModal() {
    this.showReservationModal = false;
    this.reservationForm.reset();
    this.selectedReservation = null;
  }
 
  saveReservation() {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }
 
    const formValue = this.reservationForm.value;
 
    const createData = {
      ItemID: formValue.itemID,
      BinID: formValue.binID,
      ReferenceType: formValue.referenceType === 'Order' ? 0 : 1,
      ReferenceID: formValue.referenceID,
      Quantity: formValue.quantity
    } as any;
 
    this.reservationService.create(createData).subscribe({
      next: () => {
        this.loadReservations();
        this.loadInventory();
        this.closeReservationModal();
      },
      error: (err) => {
        console.error('Error creating reservation', err);
        alert(err.error?.message || 'Error creating reservation. Check if sufficient stock is available.');
      }
    });
  }
 
  confirmDeleteReservation(reservation: StockReservation) {
    this.selectedReservation = reservation;
    this.showDeleteDialog = true;
  }
 
  deleteReservation() {
    if (this.selectedReservation) {
      this.reservationService.delete(this.selectedReservation.reservationID).subscribe({
        next: () => {
          this.loadReservations();
          this.loadInventory();
          this.showDeleteDialog = false;
          this.selectedReservation = null;
        },
        error: (err) => console.error('Error deleting reservation', err)
      });
    }
  }
 
  getItemName(itemID: number): string {
    const item = this.items.find(i => i.itemID === itemID);
    return item ? item.sku : 'Unknown';
  }
 
  getBinCode(binID: number): string {
    const bin = this.bins.find(b => b.binID === binID);
    return bin ? bin.code : 'Unknown';
  }
}
 
 