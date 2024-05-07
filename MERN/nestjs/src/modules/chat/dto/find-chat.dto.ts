import { IsString } from 'class-validator';

export class FindChatDto {
  @IsString()
  userId: string;
}
