import { IsString } from 'class-validator';

export class RemoveUsersFromGroupChatDto {
  @IsString()
  chatId: string;

  @IsString({ each: true })
  receiveIds: string[];
}
