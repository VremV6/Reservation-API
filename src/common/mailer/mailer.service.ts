import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public sendEmail(): void {
    this.mailerService
      .sendMail({
        to: 'jipadragos09@gmail.com', // list of receivers
        from: 'pjgacdmzjohsxkihpq@bbitq.com', // sender address
        subject: 'Testing Nest MailModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
        console.log('Email sent');
      })
      .catch(() => {
        console.log('Email failed');
      });
  }
}
