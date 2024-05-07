import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsOptional()
  @IsBoolean()
  isGroupChat: boolean;

  @IsString()
  senderId: string;

  @IsString()
  receiveId: string;
}
