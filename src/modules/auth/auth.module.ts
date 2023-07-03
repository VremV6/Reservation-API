import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { MicroserviceClient } from '../../microservice/microserviceClient.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const config = fs.readJsonSync('./src/config/config.json');

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' });
@Module({
  imports: [
    passportModule,
    JwtModule.register({
      global: true,
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, MicroserviceClient],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
