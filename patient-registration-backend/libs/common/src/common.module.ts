import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { MailerModule } from './mailer/mailer.module';


@Module({
  providers: [CommonService],
  exports: [CommonService],
  imports: [CommonModule, MailerModule],
})
export class CommonModule {}
