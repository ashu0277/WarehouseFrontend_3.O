// Warehouse model - matches WarehouseResponseDto
export interface Warehouse {
  warehouseID: number;
  name: string;
  location: string;
  status: string;
  createdAt: string;
  totalZones: number;
}
