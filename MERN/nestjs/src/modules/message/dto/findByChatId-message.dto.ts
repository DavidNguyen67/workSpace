import { IsString } from 'class-validator';

export class FindByChatIdDto {
  @IsString()
  chatId: string;
}
