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
    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Set the start date to the beginning of the current day
    const startDate = new Date(currentYear, currentMonth, currentDay);
    // Set the end date to the beginning of the next day
    const endDate = new Date(currentYear, currentMonth, currentDay + 1);

    // Set the query to match reservations between the start and end dates
    query.start_date = { $gte: startDate, $lt: endDate };

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
