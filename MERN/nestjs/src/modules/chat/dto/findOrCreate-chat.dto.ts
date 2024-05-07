import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateChatDto } from './create-chat.dto';

export class FindOrCreateChatDto extends PartialType(CreateChatDto) {
  @IsOptional()
  @IsBoolean()
  isGroupChat: boolean;

  @IsString()
  senderId: string;

  @IsString()
  receiveId: string;
}
