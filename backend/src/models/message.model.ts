import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    id: { type: String, require: true },
    senderId: { type: String, require: true },
    text: { type: String, require: true },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
