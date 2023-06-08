import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { Constants } from '../../common/constants';
import * as bcrypt from 'bcrypt';
// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject(Constants.USER_MODEL)
    private userModel: Model<User>,
  ) {}
  async createUser(userDto: UserDto): Promise<User> {
    const { name, password, email, role } = userDto;
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
      role,
      created_at: new Date(),
      updated_at: new Date(),
    });

    // Save the new user to the database
    await newUser.save();

    // Return the created user
    return newUser;
  }

  async findOneByName(name: string): Promise<User | undefined> {
    return await this.userModel.findOne({ name }).exec();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.userModel.findOne({ _id: id }).exec();
  }
}
