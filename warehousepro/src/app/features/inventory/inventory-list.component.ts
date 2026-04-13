import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryBalanceService } from '../../core/services/inventory-balance.service';
import { InventoryBalance } from '../../core/models/inventory-balance.model';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  private inventoryService = inject(InventoryBalanceService);

  inventory: InventoryBalance[] = [];
  filteredInventory: InventoryBalance[] = [];
  
  searchTerm = '';

  ngOnInit() {
    this.loadInventory();
  }

  loadInventory() {
    this.inventoryService.getAll().subscribe({
      next: (data) => {
        this.inventory = data;
        this.filteredInventory = data;
      },
      error: (err) => console.error('Error loading inventory', err)
    });
  }

  filterInventory() {
    this.filteredInventory = this.inventory.filter(i => {
      return !this.searchTerm || 
        i.sku.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (i.itemDescription && i.itemDescription.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        i.binCode.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
  }

  resetFilters() {
    this.searchTerm = '';
    this.filteredInventory = this.inventory;
  }
}
