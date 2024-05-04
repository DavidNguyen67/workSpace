/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { NotificationService } from '../notification/notification.service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNotificationDto } from '../notification/dto/update-notification.dto';
import { CreateNotificationDto } from '../notification/dto/create-notification.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  updateProfile = async (update_dto: UpdateUserDto): Promise<any> => {
    try {
      const user = await this.userRepository.findOne({
        where: { id: update_dto.id },
      });
      const updated_user = {
        ...user,
        username: update_dto.username,
        email: update_dto.email,
      };
      const saved_user = await this.userRepository.save(updated_user);
      if (saved_user) {
        // send push notification
        await this.notificationService
          .sendPush(
            updated_user,
            'Profiie update',
            'Your Profile have been updated successfully',
          )
          .catch((e) => {
            console.log('Error sending push notification', e);
          });
      }
      return saved_user;
    } catch (error) {
      return error;
    }
  };

  enablePush = async (update_dto: CreateNotificationDto): Promise<any> => {
    const user = await this.userRepository.findOne({
      where: { id: +update_dto.user_id },
    });
    return await this.notificationService.acceptPushNotification(
      user,
      update_dto,
    );
  };

  disablePush = async (
    user_id: number,
    update_dto: UpdateNotificationDto,
  ): Promise<any> => {
    const user = await this.userRepository.findOne({
      where: { id: user_id },
    });
    return await this.notificationService.disablePushNotification(
      user,
      update_dto,
    );
  };

  getPushNotifications = async (): Promise<any> => {
    return await this.notificationService.getNotifications();
  };
}
