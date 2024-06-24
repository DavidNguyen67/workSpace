/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:16:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 20:57:30
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Photo } from 'src/module/database/entity/photo.entity';

export class CreatePhotoDto extends PartialType(Photo) {
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  name: string;
}
