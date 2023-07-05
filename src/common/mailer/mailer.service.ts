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
      html: `<head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Reservation Confirmation</title>
              <style>
                  /* Styles for the email template */
                  body {
                      font-family: Arial, sans-serif;
                      line-height: 1.6;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
          
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                  }
          
                  h1 {
                      color: #333;
                      font-size: 24px;
                      margin-bottom: 20px;
                  }
          
                  p {
                      color: #555;
                      font-size: 16px;
                      margin-bottom: 10px;
                  }
          
                  .button {
                      display: inline-block;
                      padding: 10px 20px;
                      background-color: #007bff;
                      color: #fff;
                      text-decoration: none;
                      border-radius: 4px;
                  }
              </style>
            </head>
            <body>
                <div class="container">
                    <h1>Reservation Confirmation</h1>
                    <p>Hello,</p>
                    <p>You have successfully made a reservation for <strong>${emailObject.title}</strong> at <strong>${emailObject.company}</strong>.</p>
                    <p>The reservation starts at: <strong>${emailObject.start_date}</strong>.</p>
                    <p>To cancel the reservation, click the button below:</p>
                    <a class="button" href="http://localhost:4200/cancel-reservation?id=${emailObject.id}">Cancel Reservation</a>
                </div>
            </body>`,
    });
  }
}
