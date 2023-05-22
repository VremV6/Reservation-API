import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailService } from './mailer.service';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const config = fs.readJsonSync('./src/config/config.json');

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (): MailerOptions => ({
        transport: {
          host: config.mail.host,
          port: config.mail.port,
          ignoreTLS: config.mail.ignoreTLS,
          secure: config.mail.secure,
          auth: {
            user: config.mail.user,
            pass: config.mail.pass,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
        template: {
          dir: process.cwd() + '/template/',
          adapter: new PugAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
})
export class MailModule {}
