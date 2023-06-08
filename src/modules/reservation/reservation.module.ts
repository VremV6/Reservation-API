import { Module } from '@nestjs/common';
import { ReservationsController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { reservationProviders } from './reservation.providers';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { MailModule } from '../../common/mailer/mail.module';
import { MailService } from '../../common/mailer/mailer.service';

@Module({
  imports: [DatabaseModule, PassportModule, UserModule, MailModule],
  controllers: [ReservationsController],
  providers: [ReservationService, MailService, ...reservationProviders],
})
export class ReservationModule {}
