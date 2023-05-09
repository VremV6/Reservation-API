import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  created_at: Date,
  updated_at: Date,
});
