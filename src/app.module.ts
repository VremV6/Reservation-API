import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './common/mailer/mail.module';
import { SystemModule } from './modules/system/system.module';
import { MicroserviceModule } from './microservice/microservice.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ReservationModule,
    AuthModule,
    MailModule,
    SystemModule,
    MicroserviceModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
