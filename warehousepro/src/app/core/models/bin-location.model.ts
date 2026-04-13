// BinLocation model - matches BinLocationResponseDto
export interface BinLocation {
  binID: number;
  zoneID: number;
  zoneName: string;
  warehouseName: string;
  code: string;
  capacity: number;
  status: string;
}
