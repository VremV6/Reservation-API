import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationService } from './reservation.service';
import { Reservation } from './interfaces/reservation.interface';
import { CustomException } from '../../common/exceptions/custom-exception';
import { AuthGuard } from '@nestjs/passport';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationService) {}

  @Post()
  async create(@Body() createReservationDto: CreateReservationDto) {
    try {
      return this.reservationsService.create(createReservationDto);
    } catch (error) {
      throw new CustomException(
        'Rezervarea nu a putut fi facuta!',
        error.status,
      );
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<Reservation[]> {
    try {
      return this.reservationsService.findAll();
    } catch (error) {
      throw new CustomException(
        'Nu s-au putut gasi rezervarile!',
        error.status,
      );
    }
  }
}
