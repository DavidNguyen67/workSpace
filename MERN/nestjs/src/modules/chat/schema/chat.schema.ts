import mongoose from 'mongoose';
import { SCHEMAS } from 'src/utilities/constants';

export const ChatSchema = new mongoose.Schema(
  {
    chatName: String,
    isGroupChat: Boolean,
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: SCHEMAS.USERS,
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMAS.MESSAGE,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: SCHEMAS.USERS,
    },
  },
  {
    timestamps: true,
  },
);
