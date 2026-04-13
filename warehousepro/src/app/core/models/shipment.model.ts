// Shipment model - matches ShipmentResponseDto
export interface Shipment {
  shipmentID: number;
  orderID: number;
  orderNumber: string;
  customerName: string;
  carrier: string;
  dispatchDate?: string;
  deliveryDate?: string;
  status: string;
  createdAt: string;
}
