import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
