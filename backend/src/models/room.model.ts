import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    members: Array,
  },
  { timestamps: true }
);

const RoomModel = mongoose.model('Room', roomSchema);

export default RoomModel;
