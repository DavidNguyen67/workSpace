import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './../notification/entities/notification.entity';
import 'dotenv/config';
import { NotificationToken } from '../notification/entities/notification-token.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      entities: [Notifications, NotificationToken, User],
      synchronize: true,
    }),
    UsersModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
