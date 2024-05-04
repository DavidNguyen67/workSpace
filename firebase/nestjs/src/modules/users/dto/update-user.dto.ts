import { CreateUserDto } from './create-user.dto';
import { IsNumberString } from 'class-validator';

export class UpdateUserDto extends CreateUserDto {
  @IsNumberString()
  user_id: string;
}
