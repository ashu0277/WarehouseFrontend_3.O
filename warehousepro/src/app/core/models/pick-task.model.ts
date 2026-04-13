// PickTask model - matches PickTaskResponseDto
export interface PickTask {
  pickTaskID: number;
  orderID: number;
  orderNumber: string;
  itemID: number;
  sku: string;
  itemDescription?: string;
  binID: number;
  binCode: string;
  zoneName: string;
  pickQuantity: number;
  assignedToUserID?: number;
  assignedToName?: string;
  status: string;
  createdAt: string;
  completedAt?: string;
}
