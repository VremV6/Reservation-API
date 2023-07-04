import { SpecificOptions } from '../interfaces/system.interface';

export class CreateSystemDto {
  readonly companyId: string;
  readonly specificOptions: SpecificOptions;
  readonly selectDateMessage: string;
  readonly dateFilters: {
    filterWeekends: boolean;
    filterSpecificDates: [Date];
    filterSpecificDatesEveryYear: [Date];
  };
  hours: string[][];
  readonly openingHour: string;
  readonly closingHour: string;
  readonly weekendOpeningHour: string;
  readonly weekendClosingHour: string;
  readonly bookingDuration: number;
}
