// PackingUnit model - matches PackingUnitResponseDto
export interface PackingUnit {
  packID: number;
  orderID: number;
  orderNumber: string;
  packageType: string;
  weight: number;
  status: string;
  packedAt: string;
}
