import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    id: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel;
