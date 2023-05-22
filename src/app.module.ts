import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './common/mailer/mail.module';
@Module({
  imports: [ReservationModule, AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
