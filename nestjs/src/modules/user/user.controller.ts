import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { USER_CONSTANTS } from 'src/utilities/constants/constants.user';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller(USER_CONSTANTS.PREFIX)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(USER_CONSTANTS.ACTION.SIGN_UP)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Post(USER_CONSTANTS.ACTION.LOGIN)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }
}
