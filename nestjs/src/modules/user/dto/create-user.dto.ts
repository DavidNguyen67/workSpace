import { IsEmail, IsString, IsStrongPassword, IsUUID } from 'class-validator';
import { User } from '../schema/user.schema';

export class CreateUserDto extends User {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
