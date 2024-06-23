import { Injectable } from '@nestjs/common';
import { MailerService as NodeMailerService} from '@nestjs-modules/mailer';

@Injectable()
export class MailerService {
    constructor(private readonly mailService: NodeMailerService) {}

  sendMail({ to, subject, text }) {

    this.mailService.sendMail({
      from: 'Patients registration<cnestjs@gmail.com>',
      to,
      subject,
      text,
    }).then(() => {
      console.log('Email sent successfully');
    }).catch((error) => {
      console.error('Error sending email', error);
    });

  }
}
