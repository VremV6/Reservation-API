import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../../common/constants';
import mongoose, { Model } from 'mongoose';
import { System } from './interfaces/system.interface';
import { CustomException } from '../../common/exceptions/custom-exception';
import { CreateSystemDto } from './dto/create-system.dto';

@Injectable()
export class SystemService {
  constructor(
    @Inject(Constants.SYSTEM_MODEL)
    private systemModel: Model<System>,
  ) {}
  async findSystem(companyId: string): Promise<System> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.systemModel.findOne(query).exec();
  }

  async updateSystem(
    companyId: string,
    createSystemDto: CreateSystemDto,
  ): Promise<System> {
    const system = await this.findSystem(companyId);
    if (system.hours.length <= 1) {
      createSystemDto.hours = await this.matchingTimeSlots(createSystemDto);
    }
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.systemModel
      .findOneAndUpdate(query, createSystemDto, { new: true })
      .exec();
  }

  async createSystem(companyId: string): Promise<System> {
    const createSystemDto: { companyId: string } = {
      companyId: companyId,
    };
    const createdDefaultSystem = new this.systemModel(createSystemDto);
    if (
      !createdDefaultSystem ||
      createdDefaultSystem.companyId.toString() !== companyId
    ) {
      throw new CustomException('System not created', 400);
    }

    return createdDefaultSystem.save();
  }

  async matchingTimeSlots(system: CreateSystemDto): Promise<string[][]> {
    const {
      openingHour,
      closingHour,
      weekendOpeningHour,
      weekendClosingHour,
      dateFilters,
      bookingDuration,
    } = system;
    const matrix: string[][] = [];

    // Get the start and end date for the matrix (e.g., one week)
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + 6); // Add 6 days to get the end date

    // Iterate over each day within the start and end date range
    const currentDate = new Date(startDate);
    for (let i = 0; i <= 6; i++) {
      // Check if the date should be excluded based on filters
      if (
        i === 5 ||
        i === 6 ||
        dateFilters.filterSpecificDates.includes(currentDate) ||
        this.isRepeatingSpecificDate(
          currentDate,
          dateFilters.filterSpecificDatesEveryYear,
        )
      ) {
        // Exclude the date by adding an empty array
        if (!dateFilters.filterWeekends && (i === 5 || i === 6)) {
          matrix.push(
            this.populateMatrixWithTimeSlots(
              weekendOpeningHour,
              weekendClosingHour,
              bookingDuration,
            ),
          );
        } else {
          matrix.push([]);
        }
      } else {
        matrix.push(
          this.populateMatrixWithTimeSlots(
            openingHour,
            closingHour,
            bookingDuration,
          ),
        );
      }
    }

    return matrix;
  }

  populateMatrixWithTimeSlots(openingHour, closingHour, bookingDuration) {
    const bookingHours = [];
    const openingParts = openingHour.split(':').map(Number);
    const closingParts = closingHour.split(':').map(Number);

    const openingHourHours = openingParts[0];
    const openingHourMinutes = openingParts[1];

    const closingHourHours = closingParts[0];
    const closingHourMinutes = closingParts[1];
    let remainder = 0;

    for (let hour = openingHourHours; hour <= closingHourHours; hour++) {
      let minuteStart = 0;
      let minuteEnd = 59;

      if (hour === openingHourHours) {
        // If it's the opening hour, start from the opening minute
        minuteStart = openingHourMinutes;
      }

      if (hour === closingHourHours) {
        // If it's the closing hour, end at the closing minute
        minuteEnd = closingHourMinutes;
      }
      for (
        let minute = minuteStart;
        minute <= minuteEnd;
        minute += bookingDuration
      ) {
        if (remainder > 0) {
          minute = bookingDuration - remainder - 1;
          remainder = 0;
        }
        const hourString = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        bookingHours.push(hourString);
        if (minuteEnd - minute < bookingDuration) {
          remainder = minuteEnd - minute;
        }
      }
    }
    return bookingHours;
  }

  isRepeatingSpecificDate(date, specificDates) {
    return specificDates.some((specificDate) => {
      return (
        specificDate.getMonth() === date.getMonth() &&
        specificDate.getDate() === date.getDate()
      );
    });
  }
}
