import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FindOrCreateChatDto {
  @IsOptional()
  @IsBoolean()
  isGroupChat: boolean;

  @IsString()
  senderId: string;

  @IsString()
  receiveId: string;
}
