// PutAwayTask model - matches PutAwayTaskResponseDto
export interface PutAwayTask {
  taskID: number;
  receiptID: number;
  referenceNo: string;
  itemID: number;
  sku: string;
  itemDescription?: string;
  quantity: number;
  targetBinID: number;
  targetBinCode: string;
  assignedToUserID?: number;
  assignedToName?: string;
  status: string;
  createdAt: string;
  completedAt?: string;
}
