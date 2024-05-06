import mongoose from 'mongoose';
import { DEFAULT_VALUE } from 'src/utilities/constants';

export const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    username: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    status: {
      type: String,
      default: DEFAULT_VALUE.IN_ACTIVE,
    },
  },
  {
    timestamps: true,
  },
);
