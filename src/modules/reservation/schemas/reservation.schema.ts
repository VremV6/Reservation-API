import * as mongoose from 'mongoose';

export const ReservationSchema = new mongoose.Schema({
  start_date: Date,
  end_date: Date,
  name: String,
  description: String,
});
