import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PickTaskService } from '../../core/services/pick-task.service';
import { OrderService } from '../../core/services/order.service';
import { ItemService } from '../../core/services/item.service';
import { BinLocationService } from '../../core/services/bin-location.service';
import { UserService } from '../../core/services/user.service';
import { PickTask } from '../../core/models/pick-task.model';
import { Order } from '../../core/models/order.model';
import { Item } from '../../core/models/item.model';
import { BinLocation } from '../../core/models/bin-location.model';
import { User } from '../../core/models/user.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-picking-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './picking-list.component.html',
  styleUrls: ['./picking-list.component.css']
})
export class PickingListComponent implements OnInit {
  private pickTaskService = inject(PickTaskService);
  private orderService = inject(OrderService);
  private itemService = inject(ItemService);
  private binService = inject(BinLocationService);
  private userService = inject(UserService);
  private fb = inject(FormBuilder);
 
  tasks: PickTask[] = [];
  filteredTasks: PickTask[] = [];
  orders: Order[] = [];
  items: Item[] = [];
  bins: BinLocation[] = [];
  operators: User[] = [];
  taskForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedTask: PickTask | null = null;
 
  searchTerm = '';
  statusFilter = '';
 
  constructor() {
    this.taskForm = this.fb.group({
      pickTaskID: [0],
      orderID: ['', Validators.required],
      itemID: ['', Validators.required],
      binID: ['', Validators.required],
      pickQuantity: [1, [Validators.required, Validators.min(1)]],
      assignedToUserID: [null]
    });
  }
 
  ngOnInit() {
    this.loadTasks();
    this.loadOrders();
    this.loadItems();
    this.loadBins();
    this.loadOperators();
  }
 
  loadTasks() {
    this.pickTaskService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => console.error('Error loading pick tasks', err)
    });
  }
 
  loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error loading orders', err)
    });
  }
 
  loadItems() {
    this.itemService.getAll().subscribe({
      next: (data) => this.items = data,
      error: (err) => console.error('Error loading items', err)
    });
  }
 
  loadBins() {
    this.binService.getAll().subscribe({
      next: (data) => this.bins = data,
      error: (err) => console.error('Error loading bins', err)
    });
  }
 
  loadOperators() {
    this.userService.getAll().subscribe({
      next: (data) => this.operators = data.filter(u => u.role === 'Operator'),
      error: (err) => console.error('Error loading operators', err)
    });
  }
 
  filterTasks() {
    this.filteredTasks = this.tasks.filter(t => {
      const matchesSearch = !this.searchTerm ||
        t.orderNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.binCode.toLowerCase().includes(this.searchTerm.toLowerCase());
     
      const matchesStatus = !this.statusFilter ||
        t.status === this.statusFilter;
     
      return matchesSearch && matchesStatus;
    });
  }
 
  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredTasks = this.tasks;
  }
 
  completeTask(task: PickTask) {
    if (confirm('Mark this task as picked? This will update the inventory balance.')) {
      const updateData = {
        AssignedToUserID: task.assignedToUserID,
        Status: 1
      } as any;
 
      this.pickTaskService.update(task.pickTaskID, updateData).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error completing task', err)
      });
    }
  }
 
  openCreateModal() {
    this.isEditMode = false;
    this.taskForm.reset({ pickTaskID: 0, pickQuantity: 1 });
    this.showModal = true;
  }
 
  openEditModal(task: PickTask) {
    this.isEditMode = true;
    this.selectedTask = task;
    this.taskForm.patchValue(task);
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
    this.taskForm.reset();
    this.selectedTask = null;
  }
 
  saveTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
 
    const formValue = this.taskForm.value;
 
    if (this.isEditMode && this.selectedTask) {
      const updateData = {
        AssignedToUserID: formValue.assignedToUserID,
        Status: formValue.status || 0
      } as any;
 
      this.pickTaskService.update(this.selectedTask.pickTaskID, updateData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating task', err)
      });
    } else {
      const createData = {
        OrderID: formValue.orderID,
        ItemID: formValue.itemID,
        BinID: formValue.binID,
        PickQuantity: formValue.pickQuantity,
        AssignedToUserID: formValue.assignedToUserID
      } as any;
 
      this.pickTaskService.create(createData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error creating task', err)
      });
    }
  }
 
  confirmDelete(task: PickTask) {
    this.selectedTask = task;
    this.showDeleteDialog = true;
  }
 
  deleteTask() {
    if (this.selectedTask) {
      this.pickTaskService.delete(this.selectedTask.pickTaskID).subscribe({
        next: () => {
          this.loadTasks();
          this.showDeleteDialog = false;
          this.selectedTask = null;
        },
        error: (err) => console.error('Error deleting task', err)
      });
    }
  }
}