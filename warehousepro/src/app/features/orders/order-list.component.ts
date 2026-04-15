import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { OrderService } from '../../core/services/order.service';
import { ItemService } from '../../core/services/item.service';
import { Order } from '../../core/models/order.model';
import { Item } from '../../core/models/item.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService);
  private itemService = inject(ItemService);
  private fb = inject(FormBuilder);

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  items: Item[] = [];
  orderForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedOrder: Order | null = null;
  
  searchTerm = '';
  statusFilter = '';

  constructor() {
    this.orderForm = this.fb.group({
      orderID: [0],
      orderNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      deliveryAddress: [''],
      orderDate: ['', Validators.required],
      requiredDate: [''],
      orderLines: this.fb.array([])
    });
  }

  get orderLines(): FormArray {
    return this.orderForm.get('orderLines') as FormArray;
  }

  ngOnInit() {
    this.loadOrders();
    this.loadItems();
  }

  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => {
        this.orders = data;
        this.filteredOrders = data;
      },
      error: (err) => console.error('Error loading orders', err)
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

  filterOrders() {
    this.filteredOrders = this.orders.filter(o => {
      const matchesSearch = !this.searchTerm || 
        o.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.customerName.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        o.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredOrders = this.orders;
  }

  openCreateModal() {
    this.isEditMode = false;
    this.orderForm.reset({ orderID: 0 });
    this.orderLines.clear();
    this.addOrderLine();
    this.showModal = true;
  }

  openEditModal(order: Order) {
    this.isEditMode = true;
    this.selectedOrder = order;
    const formattedOrderDate = order.orderDate ? new Date(order.orderDate).toISOString().slice(0, 16) : '';
    const formattedRequiredDate = order.requiredDate ? new Date(order.requiredDate).toISOString().slice(0, 16) : '';
    this.orderForm.patchValue({
      orderID: order.orderID,
      orderNumber: order.orderNumber,
      customerName: order.customerName,
      deliveryAddress: order.deliveryAddress,
      orderDate: formattedOrderDate,
      requiredDate: formattedRequiredDate
    });
    this.orderLines.clear();
    this.addOrderLine();
    this.showModal = true;
  }

  addOrderLine() {
    const line = this.fb.group({
      itemID: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    this.orderLines.push(line);
  }

  removeOrderLine(index: number) {
    if (this.orderLines.length > 1) {
      this.orderLines.removeAt(index);
    }
  }

  closeModal() {
    this.showModal = false;
    this.orderForm.reset();
    this.selectedOrder = null;
  }

  saveOrder() {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    const orderData: Order = {
      orderID: this.isEditMode && this.selectedOrder ? this.selectedOrder.orderID : 0,
      orderNumber: this.orderForm.value.orderNumber,
      customerName: this.orderForm.value.customerName,
      deliveryAddress: this.orderForm.value.deliveryAddress,
      orderDate: this.orderForm.value.orderDate,
      requiredDate: this.orderForm.value.requiredDate,
      status: this.selectedOrder?.status || 'Pending',
      createdAt: this.selectedOrder?.createdAt || new Date().toISOString(),
      totalPickTasks: this.selectedOrder?.totalPickTasks || 0,
      completedPickTasks: this.selectedOrder?.completedPickTasks || 0,
      totalShipments: this.selectedOrder?.totalShipments || 0,
      priority: this.selectedOrder?.priority || null,
      customerId: this.selectedOrder?.customerId || null
    };

    if (this.isEditMode && this.selectedOrder) {
      this.orderService.update(this.selectedOrder.orderID, orderData).subscribe({
        next: () => {
          this.loadOrders();
          this.closeModal();
        },
        error: (err) => console.error('Error updating order', err)
      });
    } else {
      this.orderService.create(orderData).subscribe({
        next: () => {
          this.loadOrders();
          this.closeModal();
        },
        error: (err) => console.error('Error creating order', err)
      });
    }
  }

  confirmDelete(order: Order) {
    this.selectedOrder = order;
    this.showDeleteDialog = true;
  }

  deleteOrder() {
    if (this.selectedOrder) {
      this.orderService.delete(this.selectedOrder.orderID).subscribe({
        next: () => {
          this.loadOrders();
          this.showDeleteDialog = false;
          this.selectedOrder = null;
        },
        error: (err) => console.error('Error deleting order', err)
      });
    }
  }
}
