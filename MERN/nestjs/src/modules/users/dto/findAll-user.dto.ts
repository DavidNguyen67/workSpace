import { IsAlphanumeric } from 'class-validator';

export class FindAllUserDto {
  @IsAlphanumeric()
  skip: number;

  @IsAlphanumeric()
  limit: number;
}
