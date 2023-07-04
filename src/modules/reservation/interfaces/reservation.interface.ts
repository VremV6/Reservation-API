import { Document } from 'mongoose';

export interface Reservation extends Document {
  readonly start_date: Date;
  readonly name: string;
  readonly title: string;
  readonly phone: string;
  readonly email: string;
  readonly companyId: string;
  readonly service: string;
}
