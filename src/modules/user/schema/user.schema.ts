import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  subscription: { type: String, required: true, enum: ['Basic', 'Pro', 'AI'] },
  created_at: Date,
  updated_at: Date,
});
