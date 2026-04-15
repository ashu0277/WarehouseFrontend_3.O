import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ShipmentService } from '../../core/services/shipment.service';
import { Shipment } from '../../core/models/shipment.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-shipment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.css']
})
export class ShipmentListComponent implements OnInit {
  private shipmentService = inject(ShipmentService);
  private fb = inject(FormBuilder);

  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  shipmentForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedShipment: Shipment | null = null;
  
  searchTerm = '';

  constructor() {
    this.shipmentForm = this.fb.group({
      shipmentID: [0],
      orderID: ['', Validators.required],
      carrier: ['', Validators.required],
      trackingNumber: [''],
      dispatchDate: [''],
      deliveryDate: ['']
    });
  }

  ngOnInit() {
    this.loadShipments();
  }

  loadShipments() {
    this.shipmentService.getAll().subscribe({
      next: (data) => {
        this.shipments = data;
        this.filteredShipments = data;
      },
      error: (err) => console.error('Error loading shipments', err)
    });
  }

  filterShipments() {
    this.filteredShipments = this.shipments.filter(s => {
      return !this.searchTerm || 
        s.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        s.carrier.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.filteredShipments = this.shipments;
  }

  openCreateModal() {
    this.isEditMode = false;
    this.shipmentForm.reset({ shipmentID: 0 });
    this.showModal = true;
  }

  openEditModal(shipment: Shipment) {
    this.isEditMode = true;
    this.selectedShipment = shipment;
    const formattedDispatch = shipment.dispatchDate ? new Date(shipment.dispatchDate).toISOString().slice(0, 16) : '';
    const formattedDelivery = shipment.deliveryDate ? new Date(shipment.deliveryDate).toISOString().slice(0, 16) : '';
    this.shipmentForm.patchValue({
      shipmentID: shipment.shipmentID,
      orderID: shipment.orderID,
      carrier: shipment.carrier,
      trackingNumber: shipment.orderNumber,
      dispatchDate: formattedDispatch,
      deliveryDate: formattedDelivery
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.shipmentForm.reset();
    this.selectedShipment = null;
  }

  saveShipment() {
    if (this.shipmentForm.invalid) {
      this.shipmentForm.markAllAsTouched();
      return;
    }

    const shipmentData = this.shipmentForm.value;

    if (this.isEditMode && this.selectedShipment) {
      this.shipmentService.update(this.selectedShipment.shipmentID, shipmentData).subscribe({
        next: () => {
          this.loadShipments();
          this.closeModal();
        },
        error: (err) => console.error('Error updating shipment', err)
      });
    } else {
      this.shipmentService.create(shipmentData).subscribe({
        next: () => {
          this.loadShipments();
          this.closeModal();
        },
        error: (err) => console.error('Error creating shipment', err)
      });
    }
  }

  confirmDelete(shipment: Shipment) {
    this.selectedShipment = shipment;
    this.showDeleteDialog = true;
  }

  deleteShipment() {
    if (this.selectedShipment) {
      this.shipmentService.delete(this.selectedShipment.shipmentID).subscribe({
        next: () => {
          this.loadShipments();
          this.showDeleteDialog = false;
          this.selectedShipment = null;
        },
        error: (err) => console.error('Error deleting shipment', err)
      });
    }
  }
}
