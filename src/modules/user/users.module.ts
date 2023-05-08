import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
