import { Document } from 'mongoose';

export interface System extends Document {
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
  readonly companyId: string;
}

export interface SpecificOptions {
  optionName: string;
  serviceOptions: Array<ServiceOption>;
  userNotice: string | null;
}

export interface ServiceOption {
  optionName: string;
  services: Array<ItemPrice> | null;
}

export interface ItemPrice {
  optionName: string;
  price: number;
  currency: AcceptedCurrencies;
}

export enum AcceptedCurrencies {
  EUR = 'EUR',
  RON = 'RON',
  USD = 'USD',
}

export interface BusinessHours {
  hours: Date[][];
}
