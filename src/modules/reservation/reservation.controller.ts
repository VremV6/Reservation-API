import {
  Body,
  Controller,
  createParamDecorator,
  Delete,
  ExecutionContext,
  Get,
  Param,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { Reservation } from './interfaces/reservation.interface';
import { CustomException } from '../../common/exceptions/custom-exception';
import { AuthGuard } from '@nestjs/passport';

export interface User {
  userId: string;
  username: string;
}
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();

    return req.user;
  },
);

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      return await this.reservationsService.create(createReservationDto);
    } catch (error) {
      throw new CustomException(
        'Rezervarea nu a putut fi facuta!',
        error.status,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllForCompany(@GetUser() user: User): Promise<Reservation[]> {
    try {
      return this.reservationsService.findAllForCompanies(user.userId);
    } catch (error) {
      throw new CustomException(
        'Nu s-au putut gasi rezervarile!',
        error.status,
      );
    }
  }
  @Get('/clients/:id')
  async findAllForClients(@Param('id') id: string): Promise<Reservation[]> {
    try {
      return this.reservationsService.findAllForClients(id);
    } catch (error) {
      throw new CustomException(
        'Nu s-au putut gasi rezervarile!',
        error.status,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Reservation> {
    try {
      const userId: string = user.userId;
      const reservation = await this.reservationsService.findById(id, userId);
      const companyId = reservation.get('companyId');
      if (userId !== companyId.toString()) {
        throw new UnauthorizedException();
      }
      return reservation;
    } catch (error) {
      throw new CustomException('Nu s-a putut gasi rezervarea!', error.status);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reservation> {
    try {
      return this.reservationsService.delete(id);
    } catch (error) {
      throw new CustomException(
        'Nu s-a putut sterge rezervarea!',
        error.status,
      );
    }
  }
}
