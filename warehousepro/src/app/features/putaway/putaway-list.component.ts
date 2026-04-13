import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { PutAwayTaskService } from '../../core/services/putaway-task.service';
import { PutAwayTask } from '../../core/models/putaway-task.model';
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
  private fb = inject(FormBuilder);

  tasks: PutAwayTask[] = [];
  filteredTasks: PutAwayTask[] = [];
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
    if (confirm('Mark this task as completed?')) {
      this.putAwayService.update(task.taskID, { ...task, status: 'Completed' }).subscribe({
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

    const taskData = this.taskForm.value;

    if (this.isEditMode && this.selectedTask) {
      this.putAwayService.update(this.selectedTask.taskID, taskData).subscribe({
        next: () => {
          this.loadTasks();
          this.closeModal();
        },
        error: (err) => console.error('Error updating task', err)
      });
    } else {
      this.putAwayService.create(taskData).subscribe({
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
