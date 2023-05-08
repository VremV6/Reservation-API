import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Reservation } from './interfaces/reservation.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Constants } from '../../common/constants';
import { CustomException } from '../../common/exceptions/custom-exception';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(Constants.RESERVATION_MODEL)
    private reservationModel: Model<Reservation>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const createdReservation = new this.reservationModel(createReservationDto);
    if (!createdReservation.name) {
      throw new CustomException('Rezervarea nu a putut fi facuta!', 400);
    }
    return createdReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }
}
