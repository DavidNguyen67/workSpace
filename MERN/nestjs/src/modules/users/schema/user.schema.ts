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
    avatar: {
      type: String,
      default:
        'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
    },
  },
  {
    timestamps: true,
  },
);
