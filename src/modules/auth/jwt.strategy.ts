import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
const config = fs.readJsonSync('./src/config/config.json');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwt.secret,
    });
  }

  async validate(payload: any) {
    const result = await this.authService.validateUser(
      payload.username,
      payload.password,
    );
    const { _id: userId, name: username } = result._doc;
    return { userId: userId.toString(), username };
  }
}
