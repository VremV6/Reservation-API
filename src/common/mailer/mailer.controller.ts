import { Controller, Logger } from '@nestjs/common';
import { MailService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  private logger = new Logger(MailerController.name);

  constructor(private readonly mailService: MailService) {}
}
