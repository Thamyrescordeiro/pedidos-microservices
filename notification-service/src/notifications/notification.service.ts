import { Injectable, Logger } from '@nestjs/common';
import { Notification } from './notification.entity';
import { OrderCreatedEvent } from './order-created-envent';

@Injectable()
export class NotificationService {

  private readonly logger = new Logger(NotificationService.name);
  private readonly notifications: Notification[] = [];

  handleOrderCreated(event: OrderCreatedEvent): void {
    const notification: Notification = {
      orderId: event.orderId,
      message: `Pedido de ${event.customerName} recebido: ${event.quantity}x ${event.item}`,
      receivedAt: new Date().toISOString(),
    };

    this.notifications.push(notification);
    this.logger.log(`Notificacao registrada para o pedido ${event.orderId}`);
  }

  findAll(): Notification[] {
    return this.notifications;
  }
}

