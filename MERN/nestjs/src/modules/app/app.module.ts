import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import 'dotenv/config';
import { ChatModule } from '../chat/chat.module';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule,
    ChatModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
