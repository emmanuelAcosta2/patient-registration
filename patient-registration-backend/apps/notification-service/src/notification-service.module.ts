import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { NotificationProcessor } from './processors/notification.processor'; 
import { MailerModule } from '@app/common/mailer/mailer.module'; 

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'notification',
    }),
    MailerModule,
  ],
  providers: [NotificationProcessor],
})
export class NotificationServiceModule {}
