import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PassportModule } from '@nestjs/passport';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { systemProviders } from './system.providers';

@Module({
  imports: [DatabaseModule, PassportModule],
  controllers: [SystemController],
  providers: [SystemService, ...systemProviders],
})
export class SystemModule {}
