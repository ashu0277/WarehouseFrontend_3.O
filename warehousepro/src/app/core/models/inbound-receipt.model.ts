// InboundReceipt model - matches InboundReceiptResponseDto
export interface InboundReceipt {
  receiptID: number;
  referenceNo: string;
  supplier: string;
  receiptDate: string;
  status: string;
  createdAt: string;
  totalPutAwayTasks: number;
  completedPutAwayTasks: number;
}
