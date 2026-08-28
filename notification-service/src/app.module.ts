import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { NotificationModule } from './notifications/notification.module';


@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
      },
    }),
    NotificationModule,
  ],
})
export class AppModule {}