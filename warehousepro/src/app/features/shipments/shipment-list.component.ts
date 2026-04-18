import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ShipmentService } from '../../core/services/shipment.service';
import { OrderService } from '../../core/services/order.service';
import { Shipment } from '../../core/models/shipment.model';
import { Order } from '../../core/models/order.model';
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
  private orderService = inject(OrderService);
  private fb = inject(FormBuilder);
 
  shipments: Shipment[] = [];
  filteredShipments: Shipment[] = [];
  orders: Order[] = [];
  shipmentForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedShipment: Shipment | null = null;
 
  searchTerm = '';
 
  constructor() {
    this.shipmentForm = this.fb.group({
      shipmentID: [0],
      orderID: [null, Validators.required],
      customer: [''],
      carrier: ['', Validators.required],
      dispatchDate: [''],
      deliveryDate: [''],
      status: [0, ]
    });
  }
 
  ngOnInit() {
    this.loadShipments();
    this.loadOrders();
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
 
  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error('Error loading orders', err)
    });
  }
 
  onOrderChange() {
    const orderID = this.shipmentForm.get('orderID')?.value;
    const selectedOrder = this.orders.find(o => o.orderID === +orderID);
    this.shipmentForm.patchValue({
      customer: selectedOrder?.customerName || ''
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
    this.shipmentForm.reset({ shipmentID: 0, customer: '' });
    this.showModal = true;
  }
 
  openEditModal(shipment: Shipment) {
    this.isEditMode = true;
    this.selectedShipment = shipment;
    const formattedDispatch = shipment.dispatchDate ? new Date(shipment.dispatchDate).toISOString().slice(0, 16) : '';
    const formattedDelivery = shipment.deliveryDate ? new Date(shipment.deliveryDate).toISOString().slice(0, 16) : '';
   
    let statusValue = 0;
    if (shipment.status === 'Dispatched') statusValue = 0;
    else if (shipment.status === 'InTransit') statusValue = 1;
    else if (shipment.status === 'Delivered') statusValue = 2;
   
    this.shipmentForm.patchValue({
      shipmentID: shipment.shipmentID,
      orderID: shipment.orderID,
      customer: shipment.customerName,
      carrier: shipment.carrier,
      dispatchDate: formattedDispatch,
      deliveryDate: formattedDelivery,
      status: statusValue
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
 
    const formValue = this.shipmentForm.value;
 
    if (this.isEditMode && this.selectedShipment) {
      const updateData = {
        Status: parseInt(formValue.status),
        DispatchDate: formValue.dispatchDate || null,
        DeliveryDate: formValue.deliveryDate || null
      } as any;
 
      this.shipmentService.update(this.selectedShipment.shipmentID, updateData).subscribe({
        next: () => {
          this.loadShipments();
          this.closeModal();
        },
        error: (err) => console.error('Error updating shipment', err)
      });
    } else {
      const createData = {
        OrderID: parseInt(formValue.orderID),
        Carrier: formValue.carrier,
        DispatchDate: formValue.dispatchDate || null,
        DeliveryDate: formValue.deliveryDate || null
      } as any;
 
      this.shipmentService.create(createData).subscribe({
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
 
 