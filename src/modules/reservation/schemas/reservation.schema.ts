import * as mongoose from 'mongoose';
import { model, Types } from 'mongoose';
import { UserSchema } from '../../user/schema/user.schema';

export const ReservationSchema = new mongoose.Schema({
  start_date: { type: Date, unique: true, required: true },
  title: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
  companyId: {
    type: Types.ObjectId,
    ref: model('User', UserSchema),
    required: true,
  },
});
