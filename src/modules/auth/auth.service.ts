import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UsersService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { UserDto } from '../user/dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MicroserviceClient } from '../../microservice/microserviceClient.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
    private microServiceClient: MicroserviceClient,
  ) {}

  async signIn(authDto: AuthDto): Promise<any> {
    const { name, password } = authDto;

    const user = await this.usersService.findOneByName(name);
    if (!user) {
      throw new UnauthorizedException('Utilizatorul nu exista!');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentiale Invalide!');
    }

    const payload = {
      username: user.name,
      userId: user.id,
      password: user.password,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(userDto: UserDto): Promise<User> {
    // Check if the username already exists
    const existingUser = await this.usersService.findOneByName(userDto.name);
    if (existingUser) {
      throw new ConflictException('Utilizatorul exista deja!');
    }
    const plan = {
      name: userDto.subscription,
    };
    const payment = await this.microServiceClient.sendRequest(plan);

    // Create the user
    const createdUser = await this.usersService.createUser(userDto);

    // Generate the access token
    const payload = {
      password: createdUser.password,
      username: createdUser.username,
      userId: createdUser.userId,
      subscription: createdUser.subscription,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken, stripe: payment };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }
}
