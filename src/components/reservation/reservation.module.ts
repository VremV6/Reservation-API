import { Module } from '@nestjs/common';
import { ReservationsController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { reservationProviders } from './reservation.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ReservationsController],
  providers: [ReservationService, ...reservationProviders],
})
export class ReservationModule {}
