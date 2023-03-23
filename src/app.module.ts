import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationsController } from './components/reservation/reservation.controller';
import { ReservationModule } from './components/reservation/reservation.module';

@Module({
  imports: [ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
