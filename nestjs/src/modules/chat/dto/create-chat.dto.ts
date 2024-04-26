import { IsUUID } from 'class-validator';

export class CreateChatDto {
  @IsUUID()
  userId: string;
}
