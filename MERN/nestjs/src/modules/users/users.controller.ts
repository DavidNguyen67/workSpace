import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_CONSTANTS } from 'src/utilities/constants';
import { LoginUserDto } from './dto/login-user.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';

@Controller(USER_CONSTANTS.PREFIX)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(USER_CONSTANTS.ACTION.SIGN_UP)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post(USER_CONSTANTS.ACTION.LOGIN)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  @Get()
  findAll(@Query() findAllUserDto: FindAllUserDto) {
    return this.usersService.findAll(findAllUserDto);
  }
}
