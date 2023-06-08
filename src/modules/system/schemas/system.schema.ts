import * as mongoose from 'mongoose';
import { model, Types } from 'mongoose';
import { UserSchema } from '../../user/schema/user.schema';
import { ServiceOption } from '../interfaces/system.interface';

export const SystemSchema = new mongoose.Schema({
  specificOptions: {
    optionName: { type: String, default: '' },
    serviceOptions: { type: Array<ServiceOption>, default: [] },
    userNotice: { type: String, default: '' },
  },
  selectDateMessage: { type: String, default: '' },
  dateFilters: {
    filterWeekends: { type: Boolean, default: false },
    filterSpecificDates: {
      type: [Date],
      default: [],
    },
    filterSpecificDatesEveryYear: {
      type: [Date],
      default: [],
    },
  },
  hours: { type: [[Date]], required: true },
  minDate: { type: Date, default: new Date().toISOString() },
  maxDate: { type: Date, default: new Date().toISOString() },
  companyId: {
    type: Types.ObjectId,
    ref: model('User', UserSchema),
    required: true,
    unique: true,
  },
});
