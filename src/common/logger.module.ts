import { Module } from '@nestjs/common';
import { MyLogger } from './logger.service';
import { MailerController } from './mailer/mailer.controller';
import { MailModule } from './mailer/mail.module';

@Module({
  providers: [MyLogger],
  exports: [MyLogger],
  controllers: [MailerController],
  imports: [MailModule],
})
export class LoggerModule {}
