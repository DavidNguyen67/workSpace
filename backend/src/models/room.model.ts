import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    id: { type: String, require: true },
    members: { type: Array, require: true },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model('Room', roomSchema);

export default RoomModel;
