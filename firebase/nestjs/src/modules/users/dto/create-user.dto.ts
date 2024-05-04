import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto extends PartialType(User) {
  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
