import { IsString } from 'class-validator';

export class JoinRoomChatDto {
  @IsString()
  chatId: string;
}
