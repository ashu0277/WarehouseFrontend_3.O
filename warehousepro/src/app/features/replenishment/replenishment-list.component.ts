import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ReplenishmentTaskService } from '../../core/services/replenishment-task.service';
import { ItemService } from '../../core/services/item.service'; // Added
import { BinLocationService } from '../../core/services/bin-location.service';  // Added
import { ReplenishmentTask } from '../../core/models/replenishment-task.model';
import { Item } from '../../core/models/item.model';           // Added
import { BinLocation } from '../../core/models/bin-location.model';           // Added
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
  private itemService = inject(ItemService); // Injected
  private binService = inject( BinLocationService);   // Injected
  private fb = inject(FormBuilder);

  tasks: ReplenishmentTask[] = [];
  filteredTasks: ReplenishmentTask[] = [];
  
  // Data for dropdowns
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
      replenishID: [0], // Fixed name to match model
      itemID: ['', Validators.required],
      fromBinID: ['', Validators.required],
      toBinID: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadTasks();
    this.loadLookupData(); // Load items and bins for the form
  }

  loadTasks() {
    this.replenishmentService.getAll().subscribe({
      next: (data) => {
        this.tasks = data;
        this.filteredTasks = data;
      },
      error: (err) => console.error('Error loading tasks', err)
    });
  }

  // Implementation: Fetch data for Select Dropdowns
  loadLookupData() {
    this.itemService.getAll().subscribe(data => this.items = data);
    this.binService.getAll().subscribe(data => this.bins = data);
  }

  filterTasks() {
    this.filteredTasks = this.tasks.filter(t => {
      return !this.searchTerm || 
        t.sku?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.fromBinCode?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        t.toBinCode?.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.taskForm.reset({ replenishID: 0, quantity: 1 });
    this.showModal = true;
  }

  openEditModal(task: ReplenishmentTask) {
    this.isEditMode = true;
    this.selectedTask = task;
    // We patch using the model names
    this.taskForm.patchValue({
      replenishID: task.replenishID,
      itemID: task.itemID,
      fromBinID: task.fromBinID,
      toBinID: task.toBinID,
      quantity: task.quantity
    });
    this.showModal = true;
  }

  saveTask() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    // Mapping: Constructing a full ReplenishmentTask object
    const formValues = this.taskForm.value;
    
    // Find selected labels to satisfy the Model's required strings
    const selectedItem = this.items.find(i => i.itemID === formValues.itemID);
    const fromBin = this.bins.find(b => b.binID === formValues.fromBinID);
    const toBin = this.bins.find(b => b.binID === formValues.toBinID);

   const taskData: ReplenishmentTask = {
  replenishID: formValues.replenishID,
  itemID: formValues.itemID,
  sku: selectedItem?.sku || '',
  itemDescription: selectedItem?.description || '', // Ensure your Item model has 'description'
  
  fromBinID: formValues.fromBinID,
  // FIX: Use 'code' instead of 'binID' to match the string type
  fromBinCode: fromBin?.code || '', 
  fromZoneName: fromBin?.zoneName || '',

  toBinID: formValues.toBinID,
  // FIX: Use 'code' instead of 'binID' to match the string type
  toBinCode: toBin?.code || '', 
  toZoneName: toBin?.zoneName || '',

  quantity: formValues.quantity,
  status: this.selectedTask?.status || 'Pending',
  createdAt: this.selectedTask?.createdAt || new Date().toISOString()
};

    if (this.isEditMode && this.selectedTask) {
      this.replenishmentService.update(this.selectedTask.replenishID, taskData).subscribe({
        next: () => { this.loadTasks(); this.closeModal(); },
        error: (err) => console.error('Update error', err)
      });
    } else {
      this.replenishmentService.create(taskData).subscribe({
        next: () => { this.loadTasks(); this.closeModal(); },
        error: (err) => console.error('Create error', err)
      });
    }
  }

  deleteTask() {
    if (this.selectedTask) {
      this.replenishmentService.delete(this.selectedTask.replenishID).subscribe({
        next: () => {
          this.loadTasks();
          this.showDeleteDialog = false;
          this.selectedTask = null;
        },
        error: (err) => console.error('Delete error', err)
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.taskForm.reset();
    this.selectedTask = null;
  }
}