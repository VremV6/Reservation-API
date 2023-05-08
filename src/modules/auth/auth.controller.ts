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
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    console.log('ajunge aici');
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  // @Post('login')
  // async login(@Body() loginDto: AuthDto) {
  //   const { username, password } = loginDto;
  //   // Validate user credentials here
  //   const userId = 'your_user_id';
  //   const token = await this.authService.createToken(userId, username);
  //   return { token };
  // }
}
