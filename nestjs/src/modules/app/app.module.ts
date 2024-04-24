import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import 'dotenv/config';
import { ChatModule } from '../chat/chat.module';
import { MessageModule } from '../message/message.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MessageModule,
    ChatModule,
    UserModule,
    MongooseModule.forRoot(env.DATABASE_URL),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '3d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
