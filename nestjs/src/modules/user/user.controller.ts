import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_CONSTANTS } from 'src/utilities/constants/constants.user';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(USER_CONSTANTS.ACTION.REGISTER)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
