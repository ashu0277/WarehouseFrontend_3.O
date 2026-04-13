// Zone model - matches ZoneResponseDto
export interface Zone {
  zoneID: number;
  warehouseID: number;
  warehouseName: string;
  name: string;
  zoneType: string;
  totalBins: number;
}
