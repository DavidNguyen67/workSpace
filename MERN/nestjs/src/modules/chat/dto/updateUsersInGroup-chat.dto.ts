import { IsString } from 'class-validator';

export class UpdateUsersInGroupDto {
  @IsString()
  chatId: string;

  @IsString({ each: true })
  receiveIds: string[];

  @IsString()
  chatName: string;
}
