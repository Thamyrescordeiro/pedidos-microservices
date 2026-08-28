export interface OrderCreatedEvent {
  orderId: string;
  customerName: string;
  item: string;
  quantity: number;
  amount: number;
  createdAt: string;
}