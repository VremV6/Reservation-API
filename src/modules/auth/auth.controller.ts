import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/user.service';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: AuthDto): Promise<User> {
    this.logger.verbose(
      `Received login request for username: ${signInDto.name}`,
    );
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<User> {
    this.logger.verbose(
      `Received registration request for username: ${userDto.name}`,
    );
    return this.authService.register(userDto);
  }
}
