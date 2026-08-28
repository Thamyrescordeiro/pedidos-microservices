import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { RabbitMQConsumer } from './rabbitmq.consumer';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, RabbitMQConsumer],
})
export class NotificationModule {}