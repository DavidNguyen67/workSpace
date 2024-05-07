import { ArrayMinSize, IsArray, IsString } from 'class-validator';

export class CreateGroupChatDto {
  @IsString()
  chatName: string;

  @IsString()
  senderId: string;

  @IsArray()
  // "each" tells class-validator to run the validation on each item of the array
  @IsString({ each: true })
  @ArrayMinSize(1)
  receiveIds: string[];
}
