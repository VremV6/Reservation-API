import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ReservationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
