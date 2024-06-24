/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:09:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 20:32:32
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from '../photo/photo.module';

@Module({
  imports: [PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
