import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Mail } from './interfaces/mail.interface';
import { Constants } from '../constants';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailObject: Mail): Promise<void> {
    await this.mailerService.sendMail({
      to: emailObject.clientEmail,
      from: Constants.EMAIL,
      subject: 'Rezervare creata ✔',
      text: `Acest mail v-a fost trimis pentru a va instiinta ca ati rezervat un loc pentru ${emailObject.title} incepand cu ora ${emailObject.start_date} la ${emailObject.company}. Pentru a anula rezervarea apasati aici: http://localhost:4200/cancel-reservation?id=${emailObject.id}`,
      html: `<b>Acest mail v-a fost trimis pentru a va instiinta ca ati rezervat un loc pentru ${emailObject.title} incepand cu ora ${emailObject.start_date} la ${emailObject.company}. Pentru a anula rezervarea apasati aici: http://localhost:4200/cancel-reservation?id=${emailObject.id}</b>`,
    });
  }
}
