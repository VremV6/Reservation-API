import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createToken(userId: string, username: string): Promise<string> {
    const payload = { sub: userId, username };
    return this.jwtService.sign(payload);
  }

  async registerUser(authDto: AuthDto): Promise<User> {
    // Implement the user registration logic here
    // This can include tasks like validating input, creating a new user record, etc.
    // Return the newly created user object
  }
}
