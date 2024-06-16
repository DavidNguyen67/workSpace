/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 18:10:00
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:24:49
 * @ Description: Định nghĩa mô hình User
 */

import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>('User', UserSchema);
