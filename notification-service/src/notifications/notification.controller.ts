import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  findAll(): Notification[] {
    return this.notificationService.findAll();
  }
}