import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  content: string;

  @IsString()
  chatId: string;
}
