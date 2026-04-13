import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InboundReceiptService } from '../../core/services/inbound-receipt.service';
import { InboundReceipt } from '../../core/models/inbound-receipt.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-inbound-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './inbound-list.component.html',
  styleUrls: ['./inbound-list.component.css']
})
export class InboundListComponent implements OnInit {
  private inboundService = inject(InboundReceiptService);
  private fb = inject(FormBuilder);

  receipts: InboundReceipt[] = [];
  filteredReceipts: InboundReceipt[] = [];
  receiptForm: FormGroup;
  
  showModal = false;
  showDeleteDialog = false;
  isEditMode = false;
  selectedReceipt: InboundReceipt | null = null;
  
  searchTerm = '';
  statusFilter = '';

  constructor() {
    this.receiptForm = this.fb.group({
      receiptID: [0],
      referenceNo: ['', Validators.required],
      supplier: ['', Validators.required],
      receiptDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadReceipts();
  }

  loadReceipts() {
    this.inboundService.getAll().subscribe({
      next: (data) => {
        this.receipts = data;
        this.filteredReceipts = data;
      },
      error: (err) => console.error('Error loading receipts', err)
    });
  }

  filterReceipts() {
    this.filteredReceipts = this.receipts.filter(r => {
      const matchesSearch = !this.searchTerm || 
        r.referenceNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.supplier.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesStatus = !this.statusFilter || 
        r.status === this.statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredReceipts = this.receipts;
  }

  openCreateModal() {
    this.isEditMode = false;
    this.receiptForm.reset({ receiptID: 0 });
    this.showModal = true;
  }

  openEditModal(receipt: InboundReceipt) {
    this.isEditMode = true;
    this.selectedReceipt = receipt;
    const formattedDate = receipt.receiptDate ? new Date(receipt.receiptDate).toISOString().slice(0, 16) : '';
    this.receiptForm.patchValue({
      receiptID: receipt.receiptID,
      referenceNo: receipt.referenceNo,
      supplier: receipt.supplier,
      receiptDate: formattedDate
    });
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.receiptForm.reset();
    this.selectedReceipt = null;
  }

  saveReceipt() {
    if (this.receiptForm.invalid) {
      this.receiptForm.markAllAsTouched();
      return;
    }

    const receiptData = this.receiptForm.value;

    if (this.isEditMode && this.selectedReceipt) {
      this.inboundService.update(this.selectedReceipt.receiptID, receiptData).subscribe({
        next: () => {
          this.loadReceipts();
          this.closeModal();
        },
        error: (err) => console.error('Error updating receipt', err)
      });
    } else {
      this.inboundService.create(receiptData).subscribe({
        next: () => {
          this.loadReceipts();
          this.closeModal();
        },
        error: (err) => console.error('Error creating receipt', err)
      });
    }
  }

  confirmDelete(receipt: InboundReceipt) {
    this.selectedReceipt = receipt;
    this.showDeleteDialog = true;
  }

  deleteReceipt() {
    if (this.selectedReceipt) {
      this.inboundService.delete(this.selectedReceipt.receiptID).subscribe({
        next: () => {
          this.loadReceipts();
          this.showDeleteDialog = false;
          this.selectedReceipt = null;
        },
        error: (err) => console.error('Error deleting receipt', err)
      });
    }
  }
}
