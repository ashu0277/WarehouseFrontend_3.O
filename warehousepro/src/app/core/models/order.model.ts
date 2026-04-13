// Order model - matches OrderResponseDto
export interface Order {
  orderID: number;
  orderNumber: string;
  customerName: string;
  deliveryAddress?: string;
  orderDate: string;
  requiredDate?: string;
  status: string;
  createdAt: string;
  totalPickTasks: number;
  completedPickTasks: number;
  totalShipments: number;
  priority: any;
  customerId:any;
}
