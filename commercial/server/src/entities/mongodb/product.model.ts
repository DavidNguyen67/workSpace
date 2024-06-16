/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 18:12:00
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:09:04
 * @ Description: Định nghĩa mô hình Product
 */

import { Schema, Document, model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

export const ProductModel = model<IProduct>('Product', ProductSchema);
