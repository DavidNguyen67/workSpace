import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { UpdateNotificationDto } from '../notification/dto/update-notification.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async CreateUser(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Body() update_dto: UpdateUserDto) {
    return await this.usersService.updateProfile(update_dto);
  }

  @Put('push/enable')
  @HttpCode(HttpStatus.OK)
  async enablePush(@Body() update_dto: CreateNotificationDto) {
    return await this.usersService.enablePush(update_dto);
  }

  @Put('push/disable')
  @HttpCode(HttpStatus.OK)
  async disablePush(
    @Param('id') user_id: number,
    @Body() update_dto: UpdateNotificationDto,
  ) {
    return await this.usersService.disablePush(user_id, update_dto);
  }

  @Get('push/notifications')
  @HttpCode(HttpStatus.OK)
  async fetchPusNotifications() {
    return await this.usersService.getPushNotifications();
  }
}
