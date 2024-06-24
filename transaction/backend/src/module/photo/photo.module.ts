/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 20:33:43
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { DatabaseModule } from 'src/module/database/database.module';
import { photoProviders } from './photo.provider';
import { PhotoController } from './photo.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...photoProviders, PhotoService],
  controllers: [PhotoController],
})
export class PhotoModule {}
