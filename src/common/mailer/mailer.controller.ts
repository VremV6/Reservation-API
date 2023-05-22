import { Controller, Get } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  getHello(): void {
    return this.mailService.sendEmail();
  }
}
