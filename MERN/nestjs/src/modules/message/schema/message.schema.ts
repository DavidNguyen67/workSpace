import mongoose from 'mongoose';
import { SCHEMAS } from 'src/utilities/constants';

export const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMAS.USERS,
    },
    content: String,
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMAS.CHAT,
    },
  },
  {
    timestamps: true,
  },
);
