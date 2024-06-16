import mongooseConfig from '@/config/mongoose.config';
import { ProductModel, UserModel } from '@/entities/mongodb';
import { MONGOOSE } from '@/utilities/constants';
import mongoose from 'mongoose';

/**
 * Cung cấp Mongoose cho NestJS với nhiều mô hình.
 *
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 17:49:02
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:03:39
 * @ Description: Cấu hình và đăng ký các mô hình với Mongoose
 *
 * - Kết nối đến cơ sở dữ liệu MongoDB.
 * - Đăng ký các mô hình nếu chúng chưa được đăng ký.
 *
 * @returns {Promise<typeof mongoose>} Kết nối Mongoose
 */

export const mongooseProviders = [
  {
    provide: MONGOOSE,
    useFactory: async (): Promise<typeof mongoose> => {
      const models = [UserModel, ProductModel];

      const connection = await mongoose.connect(
        mongooseConfig.uri,
        mongooseConfig.options,
      );

      models.forEach((model) => {
        if (!connection.models[model.name]) {
          mongoose.model(model.name, model.schema);
        }
      });

      return connection;
    },
  },
];
