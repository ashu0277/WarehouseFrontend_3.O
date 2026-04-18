import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { SlottingRuleService } from '../../core/services/slotting-rule.service';
import { SlottingRule } from '../../core/models/slotting-rule.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
 
@Component({
  selector: 'app-slotting-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ConfirmDialogComponent],
  templateUrl: './slotting-list.component.html',
  styleUrls: ['./slotting-list.component.css']
})
export class SlottingListComponent implements OnInit {
  private slottingService = inject(SlottingRuleService);
  private fb = inject(FormBuilder);
 
  rules: SlottingRule[] = [];
  filteredRules: SlottingRule[] = [];
  ruleForm: FormGroup;
 
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedRule: SlottingRule | null = null;
 
  searchTerm = '';
 
  constructor() {
    this.ruleForm = this.fb.group({
      ruleID: [0],
      criterion: ['', Validators.required],
      description: [''],
      priority: [1, [Validators.required, Validators.min(1)]],
      status: [0]
    });
  }
 
  ngOnInit() {
    this.loadRules();
  }
 
  loadRules() {
    this.slottingService.getAll().subscribe({
      next: (data) => {
        this.rules = data;
        this.filteredRules = data;
      },
      error: (err) => console.error('Error loading slotting rules', err)
    });
  }
 
  filterRules() {
    this.filteredRules = this.rules.filter(r => {
      return !this.searchTerm ||
        r.criterion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (r.description && r.description.toLowerCase().includes(this.searchTerm.toLowerCase()));
    });
  }
 
  resetFilters() {
    this.searchTerm = '';
    this.filteredRules = this.rules;
  }
 
  openCreateModal() {
    this.isEditMode = false;
    this.ruleForm.reset({ ruleID: 0, priority: 1 });
    this.showModal = true;
  }
 
  openEditModal(rule: SlottingRule) {
    this.isEditMode = true;
    this.selectedRule = rule;
    this.ruleForm.patchValue(rule);
    this.showModal = true;
  }
 
  closeModal() {
    this.showModal = false;
    this.ruleForm.reset();
    this.selectedRule = null;
  }
 
  saveRule() {
    if (this.ruleForm.invalid) {
      this.ruleForm.markAllAsTouched();
      return;
    }
 
    const formValue = this.ruleForm.value;
 
    if (this.isEditMode && this.selectedRule) {
      const updateData = {
        Criterion: parseInt(formValue.criterion),
        Priority: formValue.priority,
        Description: formValue.description,
        Status: formValue.status || 0
      } as any;
 
      this.slottingService.update(this.selectedRule.ruleID, updateData).subscribe({
        next: () => {
          this.loadRules();
          this.closeModal();
        },
        error: (err) => console.error('Error updating rule', err)
      });
    } else {
      const createData = {
        Criterion: parseInt(formValue.criterion),
        Priority: formValue.priority,
        Description: formValue.description
      } as any;
 
      this.slottingService.create(createData).subscribe({
        next: () => {
          this.loadRules();
          this.closeModal();
        },
        error: (err) => console.error('Error creating rule', err)
      });
    }
  }
 
  confirmDelete(rule: SlottingRule) {
    this.selectedRule = rule;
    this.showDeleteDialog = true;
  }
 
  deleteRule() {
    if (this.selectedRule) {
      this.slottingService.delete(this.selectedRule.ruleID).subscribe({
        next: () => {
          this.loadRules();
          this.showDeleteDialog = false;
          this.selectedRule = null;
        },
        error: (err) => console.error('Error deleting rule', err)
      });
    }
  }
}