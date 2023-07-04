import mongoose, { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
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
    const start_date = createdReservation.get('start_date');
    if (!start_date) {
      throw new CustomException('Rezervarea nu a putut fi facuta!', 400);
    }
    return createdReservation.save();
  }

  async findAllForCompanies(companyId: string): Promise<Reservation[]> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.reservationModel.find(query).exec();
  }

  async findAllTodayForCompanies(companyId: string): Promise<Reservation[]> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    // find all reservations for today
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    query.start_date = { $gte: today, $lt: tomorrow };
    return await this.reservationModel.find(query).exec();
  }

  async findAllForClients(companyId: string): Promise<Reservation[]> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    // select only the fields we want
    return await this.reservationModel
      .find(query)
      .select('_id start_date companyId')
      .exec();
  }

  async findById(id: string, companyId: string): Promise<Reservation> {
    return await this.reservationModel
      .findOne({
        _id: new mongoose.Types.ObjectId(id),
        companyId: new mongoose.Types.ObjectId(companyId),
      })
      .exec();
  }

  async delete(id: string): Promise<Reservation> {
    return this.reservationModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}
