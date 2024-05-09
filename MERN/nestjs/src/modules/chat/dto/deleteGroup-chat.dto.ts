import { IsString } from 'class-validator';

export class DeleteGroupChatDto {
  @IsString()
  chatId: string;
}
