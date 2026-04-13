// StockReservation model - matches StockReservationResponseDto
export interface StockReservation {
  reservationID: number;
  itemID: number;
  sku: string;
  referenceType: string;
  referenceID: number;
  quantity: number;
  createdAt: string;
}
