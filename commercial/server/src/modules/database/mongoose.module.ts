/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 17:41:08
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:04:11
 * @ Description:
 */

import { mongooseProviders } from '@/providers/mongoose.providers';
import { Module } from '@nestjs/common';

@Module({
  providers: [...mongooseProviders],
  exports: [...mongooseProviders],
})
export class MongodbModule {}
