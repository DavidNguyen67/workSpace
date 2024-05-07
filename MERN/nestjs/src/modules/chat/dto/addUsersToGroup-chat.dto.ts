import { ArrayMinSize, IsString } from 'class-validator';

export class AddUsersGroupChatDto {
  @IsString()
  chatId: string;

  @IsString({ each: true })
  @ArrayMinSize(1)
  receiveIds: string[];
}
