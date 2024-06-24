/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:09:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 22:04:14
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  async createOne(@Body() createPhotoDto: CreatePhotoDto) {
    return await this.photoService.createOne(createPhotoDto);
  }

  @Get()
  async findAll() {
    return await this.photoService.findAll();
  }

  @Delete()
  async deleteOne(@Query('id', ParseUUIDPipe) deletePhotoDto: string) {
    return await this.photoService.delete(deletePhotoDto);
  }
}
