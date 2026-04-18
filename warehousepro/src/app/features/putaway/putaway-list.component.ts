import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PutAwayTaskService } from '../../core/services/putaway-task.service';
import { ItemService } from '../../core/services/item.service';
import { BinLocationService } from '../../core/services/bin-location.service';
import { UserService } from '../../core/services/user.service';
import { InboundReceiptService } from '../../core/services/inbound-receipt.service';
import { PutAwayTask } from '../../core/models/putaway-task.model';
import { Item } from '../../core/models/item.model';
import { BinLocation } from '../../core/models/bin-location.model';
import { User } from '../../core/models/user.model';
import { InboundReceipt } from '../../core/models/inbound-receipt.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-putaway-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './putaway-list.component.html',
  styleUrls: ['./putaway-list.component.css']
})
export class PutAwayListComponent implements OnInit {
  private putAwayService = inject(PutAwayTaskService);
  private itemService = inject(ItemService);
  private binService = inject(BinLocationService);
  private userService = inject(UserService);
  private receiptService = inject(InboundReceiptService);
  private fb = inject(FormBuilder);
 
  tasks: PutAwayTask[] = [];
  filteredTasks: PutAwayTask[] = [];
  items: Item[] = [];
  bins: BinLocation[] = [];
  operators: User[] = [];
  receipts: InboundReceipt[] = [];
  taskForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedTask: PutAwayTask | null = null;
 
  searchTerm = '';
  statusFilter = '';
 
  constructor() {
    this.taskForm = this.fb.group({
      taskID: [0],
      receiptID: ['', Validators.required],
      itemID: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      targetBinID: ['', Validators.required],
      assignedToUserID: [null]
    });
  }
 
  ngOnInit() {
    this.loadTasks();
    this.loadItems();
    this.loadBins();
    this.loadOperators();
    this.loadReceipts();
  }
 
  loadTasks() {
    this.putAwayService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => console.error('Error loading put-away tasks', err)
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
 
  loadReceipts() {
    this.receiptService.getAll().subscribe({
      next: (data) => this.receipts = data,
      error: (err) => console.error('Error loading receipts', err)
    });
  }
 
  filterTasks() {
    this.filteredTasks = this.tasks.filter(t => {
      const matchesSearch = !this.searchTerm ||
        t.referenceNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.targetBinCode.toLowerCase().includes(this.searchTerm.toLowerCase());
     
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
 
  completeTask(task: PutAwayTask) {
    if (confirm('Mark this task as completed? This will update the inventory balance.')) {
      const updateData = {
        AssignedToUserID: task.assignedToUserID,
        Status: 2,
        TargetBinID: task.targetBinID
      } as any;
 
      this.putAwayService.update(task.taskID, updateData).subscribe({
        next: () => this.loadTasks(),
        error: (err) => console.error('Error completing task', err)
      });
    }
  }
 
  openCreateModal() {
    this.isEditMode = false;
    this.taskForm.reset({ taskID: 0, quantity: 1 });
    this.showModal = true;
  }
 
  openEditModal(task: PutAwayTask) {
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
        Status: formValue.status || 0,
        TargetBinID: formValue.targetBinID
      } as any;
 
      this.putAwayService.update(this.selectedTask.taskID, updateData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating task', err)
      });
    } else {
      const createData = {
        ReceiptID: formValue.receiptID,
        ItemID: formValue.itemID,
        Quantity: formValue.quantity,
        TargetBinID: formValue.targetBinID,
        AssignedToUserID: formValue.assignedToUserID
      } as any;
 
      this.putAwayService.create(createData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error creating task', err)
      });
    }
  }
 
  confirmDelete(task: PutAwayTask) {
    this.selectedTask = task;
    this.showDeleteDialog = true;
  }
 
  deleteTask() {
    if (this.selectedTask) {
      this.putAwayService.delete(this.selectedTask.taskID).subscribe({
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