import { Document } from 'mongoose';

export interface Reservation extends Document {
  readonly start_date: Date;
  readonly end_date: Date;
  readonly name: string;
  readonly description: string;
}
