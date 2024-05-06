import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Schemas, UserRoutes } from 'src/utilities/constants';
import { LoginUserDto } from './dto/login-user.dto';
import { FindAllUserDto } from './dto/findAll-user.dto';

@Controller(Schemas.Users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post(UserRoutes.Create)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post(UserRoutes.Login)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.usersService.login(loginUserDto);
  }

  @Get(UserRoutes.FindAll)
  findAll(@Query() findAllUserDto: FindAllUserDto) {
    return this.usersService.findAll(findAllUserDto);
  }
}
