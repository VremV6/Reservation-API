import { Controller, Get, Logger, Post, Put, UseGuards } from '@nestjs/common';
import { SystemService } from './system.service';
import { AuthGuard } from '@nestjs/passport';
import { System } from './interfaces/system.interface';
import { GetUser, User } from '../../common/auth-helper';
import { CustomException } from '../../common/exceptions/custom-exception';

@Controller('system')
export class SystemController {
  private logger = new Logger(SystemController.name);

  constructor(private readonly systemService: SystemService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findSystem(@GetUser() user: User): Promise<System> {
    try {
      this.logger.verbose('Getting system data!');
      return this.systemService.findSystem(user.userId);
    } catch (error) {
      throw new CustomException('Nu s-au putut gasi datele sistemului!', 400);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateSystem(@GetUser() user: User): Promise<System> {
    try {
      this.logger.verbose('Updating system data!');
      return this.systemService.updateSystem(user.userId);
    } catch (error) {
      throw new CustomException('Nu s-au putut gasi datele sistemului!', 400);
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createSystem(@GetUser() user: User): Promise<System> {
    try {
      this.logger.verbose('Creating system data!');
      return await this.systemService.createSystem(user.userId);
    } catch (error) {
      throw new CustomException('Nu s-au putut gasi datele sistemului!', 400);
    }
  }
}
