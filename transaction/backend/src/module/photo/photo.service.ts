/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:07:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-25 21:26:00
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { Injectable } from '@nestjs/common';
import { Photo } from 'src/module/database/entity/photo.entity';
import { Connection, InsertResult, Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectConnection() private connection: Connection,
  ) {}

  async delete(id: string) {
    await this.photoRepository.delete(id);
    return new Promise((resolve) => {
      this.connection.transaction(async (entityManager) => {
        resolve(await entityManager.delete(Photo, { id }));
      });
    });
  }

  async rollback() {}

  async findAll(): Promise<Photo[]> {
    return await this.photoRepository.find();
  }

  async createOne(createPhotoDto: CreatePhotoDto): Promise<InsertResult> {
    const photo = await this.photoRepository.insert(createPhotoDto);
    return photo;
  }
}
