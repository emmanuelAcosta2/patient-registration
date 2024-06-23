import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@app/common/mailer/mailer.service';

@Processor('notification')
export class NotificationProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('send-email')
  async handleSendEmail(job: Job) {
    console.log("Sending email to: ", job.data.email);
    const { email, subject, text } = job.data;
    await this.mailerService.sendMail({
      to: email,
      subject,
      text,
    });
  }
}
