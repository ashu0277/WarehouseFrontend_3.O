// Item model - matches ItemResponseDto
export interface Item {
  itemID: number;
  sku: string;
  description?: string;
  unitOfMeasure: string;
  status: string;
  createdAt: string;
  totalQuantityOnHand: number;
  totalReservedQuantity: number;
  totalAvailableQuantity: number;
}
