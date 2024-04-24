import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from '../message/message.module';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from 'process';
import 'dotenv/config';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    MessageModule,
    UserModule,
    MongooseModule.forRoot(env.DATABASE_URL),
  ],
  controllers: [AppController],
  // providers: [AppService, AppGateway],
  providers: [AppService],
})
export class AppModule {}
