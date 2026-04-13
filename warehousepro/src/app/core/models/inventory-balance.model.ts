// InventoryBalance model - matches InventoryBalanceResponseDto
export interface InventoryBalance {
  balanceID: number;
  itemID: number;
  sku: string;
  itemDescription?: string;
  binID: number;
  binCode: string;
  zoneName: string;
  warehouseName: string;
  quantityOnHand: number;
  reservedQuantity: number;
  availableQuantity: number;
  lastUpdated: string;
  
}
