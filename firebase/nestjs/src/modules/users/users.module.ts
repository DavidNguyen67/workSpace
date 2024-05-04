import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { NotificationModule } from '../notification/notification.module';
import { NotificationService } from '../notification/notification.service';
import { Notifications } from '../notification/entities/notification.entity';
import { NotificationToken } from '../notification/entities/notification-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Notifications, NotificationToken]),
    NotificationModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, NotificationService],
})
export class UsersModule {}
