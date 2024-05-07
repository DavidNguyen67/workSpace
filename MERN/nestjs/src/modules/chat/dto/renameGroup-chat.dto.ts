import { IsString } from 'class-validator';

export class RenameGroupChatDto {
  @IsString()
  chatId: string;

  @IsString()
  newNameGroupChat: string;
}
