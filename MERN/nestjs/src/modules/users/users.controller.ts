import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_CONSTANTS } from 'src/utilities/constants';
import { LoginUserDto } from './dto/login-user.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { FindByEmailOrUserNameUserDto } from './dto/findByEmailOrUserName-user-dto';

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

  @Get(USER_CONSTANTS.ACTION.FIND_ALL)
  async findAll(@Query() findAllUserDto: FindAllUserDto) {
    return await this.usersService.findAll(findAllUserDto);
  }

  @Get(USER_CONSTANTS.ACTION.FIND)
  async find(
    @Query() findByEmailOrUserNameUserDto: FindByEmailOrUserNameUserDto,
  ) {
    return await this.usersService.find(findByEmailOrUserNameUserDto);
  }
}
