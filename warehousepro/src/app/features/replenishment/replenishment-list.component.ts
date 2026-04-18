import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ReplenishmentTaskService } from '../../core/services/replenishment-task.service';
import { ItemService } from '../../core/services/item.service';
import { BinLocationService } from '../../core/services/bin-location.service';
import { ReplenishmentTask } from '../../core/models/replenishment-task.model';
import { Item } from '../../core/models/item.model';
import { BinLocation } from '../../core/models/bin-location.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-replenishment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './replenishment-list.component.html',
  styleUrls: ['./replenishment-list.component.css']
})
export class ReplenishmentListComponent implements OnInit {
  private replenishmentService = inject(ReplenishmentTaskService);
  private itemService = inject(ItemService);
  private binService = inject(BinLocationService);
  private fb = inject(FormBuilder);
 
  tasks: ReplenishmentTask[] = [];
  filteredTasks: ReplenishmentTask[] = [];
  items: Item[] = [];
  bins: BinLocation[] = [];
  taskForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedTask: ReplenishmentTask | null = null;
 
  searchTerm = '';
 
  constructor() {
    this.taskForm = this.fb.group({
      taskID: [0],
      itemID: ['', Validators.required],
      fromBinID: ['', Validators.required],
      toBinID: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }
 
  ngOnInit() {
    this.loadTasks();
    this.loadItems();
    this.loadBins();
  }
 
  loadTasks() {
    this.replenishmentService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => console.error('Error loading replenishment tasks', err)
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
 
  filterTasks() {
    this.filteredTasks = this.tasks.filter(t => {
      return !this.searchTerm ||
        t.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.fromBinCode.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.toBinCode.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }
 
  resetFilters() {
    this.searchTerm = '';
    this.filteredTasks = this.tasks;
  }
 
  completeTask(task: ReplenishmentTask) {
    if (confirm('Mark this task as completed? This will move inventory from one bin to another.')) {
      const updateData = {
        Status: 1
      } as any;
 
      this.replenishmentService.update(task.replenishID, updateData).subscribe({
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
 
  openEditModal(task: ReplenishmentTask) {
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
        Status: formValue.status || 0
      } as any;
 
      this.replenishmentService.update(this.selectedTask.replenishID, updateData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating task', err)
      });
    } else {
      const createData = {
        ItemID: formValue.itemID,
        FromBinID: formValue.fromBinID,
        ToBinID: formValue.toBinID,
        Quantity: formValue.quantity
      } as any;
 
      this.replenishmentService.create(createData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error creating task', err)
      });
    }
  }
 
  confirmDelete(task: ReplenishmentTask) {
    this.selectedTask = task;
    this.showDeleteDialog = true;
  }
 
  deleteTask() {
    if (this.selectedTask) {
      this.replenishmentService.delete(this.selectedTask.replenishID).subscribe({
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
 
 