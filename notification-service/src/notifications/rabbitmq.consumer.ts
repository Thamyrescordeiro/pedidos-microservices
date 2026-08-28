import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { NotificationService } from './notification.service';
import { OrderCreatedEvent } from './order-created-envent';

const EXCHANGE = 'order.exchange';
const ROUTING_KEY = 'order.created';
const QUEUE = 'notifications.order-created';
const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 3000;

@Injectable()
export class RabbitMQConsumer implements OnModuleInit {
  private readonly logger = new Logger(RabbitMQConsumer.name);

  constructor(private readonly notificationService: NotificationService) {}

  async onModuleInit(): Promise<void> {
    const url = process.env.RABBITMQ_URL ?? 'amqp://guest:guest@localhost:5672';

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const connection = await amqp.connect(url);
        const channel = await connection.createChannel();

        await channel.assertExchange(EXCHANGE, 'topic', { durable: true });
        await channel.assertQueue(QUEUE, { durable: true });
        await channel.bindQueue(QUEUE, EXCHANGE, ROUTING_KEY);

        this.logger.log(`Aguardando eventos em ${EXCHANGE} -> ${QUEUE}`);

        channel.consume(QUEUE, (msg) => {
          if (!msg) return;

          try {
            const event: OrderCreatedEvent = JSON.parse(msg.content.toString());
            this.notificationService.handleOrderCreated(event);
            channel.ack(msg);
          } catch (error) {
            this.logger.error('Falha ao processar evento, enviando para retry', error);
            channel.nack(msg, false, false);
          }
        });

        return;
      } catch (error) {
        this.logger.warn(
          `RabbitMQ indisponivel (tentativa ${attempt}/${MAX_RETRIES}), tentando novamente em ${RETRY_DELAY_MS}ms`,
        );
        await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      }
    }

    this.logger.error('Nao foi possivel conectar ao RabbitMQ apos varias tentativas');
  }
}