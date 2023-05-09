import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/user.service';
import { Logger } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: AuthDto): Promise<User> {
    this.logger.log(`Received login request for username: ${signInDto.name}`);
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
