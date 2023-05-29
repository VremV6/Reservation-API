import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  role: { type: String, unique: true, required: true },
  created_at: Date,
  updated_at: Date,
});
