import { IsString } from 'class-validator';

export class FindChatDto {
  @IsString()
  senderId: string;
}
