import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule, PassportModule],
  providers: [UsersService, ...userProviders],
  exports: [UsersService],
})
export class UserModule {}
