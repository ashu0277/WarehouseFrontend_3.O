import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PickTaskService } from '../../core/services/pick-task.service';
import { PickTask } from '../../core/models/pick-task.model';
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
  private fb = inject(FormBuilder);

  tasks: PickTask[] = [];
  filteredTasks: PickTask[] = [];
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
    if (confirm('Mark this task as completed?')) {
      this.pickTaskService.update(task.pickTaskID, { ...task, status: 'Completed' }).subscribe({
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

    const taskData = this.taskForm.value;

    if (this.isEditMode && this.selectedTask) {
      this.pickTaskService.update(this.selectedTask.pickTaskID, taskData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating task', err)
      });
    } else {
      this.pickTaskService.create(taskData).subscribe({
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
