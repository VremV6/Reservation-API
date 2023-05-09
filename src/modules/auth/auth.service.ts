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
import { CustomException } from '../../common/exceptions/custom-exception';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(authDto: AuthDto): Promise<any> {
    const { name, password } = authDto;

    const user = await this.usersService.findOneByName(name);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credentiale Invalide!');
    }

    const payload = { username: user.name, sub: user.userId };
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

    // Create the user
    const createdUser = await this.usersService.createUser(userDto);

    // Generate the access token
    const payload = { username: createdUser.username, sub: createdUser.userId };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}