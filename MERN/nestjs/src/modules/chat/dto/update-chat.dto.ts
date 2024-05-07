import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { IsOptional } from 'class-validator';

export class UpdateChatDto extends PartialType(CreateChatDto) {
  @IsOptional()
  chatName?: string;

  @IsOptional()
  isGroupChat?: boolean;

  @IsOptional()
  userId?: string;
}
