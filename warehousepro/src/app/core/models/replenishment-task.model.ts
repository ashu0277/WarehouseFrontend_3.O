// ReplenishmentTask model - matches ReplenishmentTaskResponseDto
export interface ReplenishmentTask {
  replenishID: number;
  itemID: number;
  sku: string;
  itemDescription?: string;
  fromBinID: number;
  fromBinCode: string;
  fromZoneName: string;
  toBinID: number;
  toBinCode: string;
  toZoneName: string;
  quantity: number;
  status: string;
  createdAt: string;
  completedAt?: string;
}
