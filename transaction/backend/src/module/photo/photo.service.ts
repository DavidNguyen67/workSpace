/* eslint-disable prettier/prettier */
/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 23:22:25
 * @CopyRight      : Con chù chù 🥴🥴
**/

import { Inject, Injectable } from '@nestjs/common';
import { Photo } from 'src/module/database/entity/photo.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import sleep from 'src/utility/function/sleep.function';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async createOne(createPhotoDto: CreatePhotoDto): Promise<InsertResult> {
    const photo = await this.photoRepository.insert(createPhotoDto);
    return photo;
  }

  async delete(id: string) {
    await sleep(20000);
    return await this.photoRepository.delete(id);
  }
}
