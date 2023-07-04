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
  readonly hours: [[Date]];
  readonly minDate: Date;
  readonly maxDate: Date;
}
