import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/utilities/constants';
import { ChatSchema } from './schema/chat.schema';
import { UsersService } from '../users/users.service';
import { UserSchema } from '../users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.CHAT,
        schema: ChatSchema,
      },
      {
        name: SCHEMAS.USERS,
        schema: UserSchema,
      },
    ]),
    JwtModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, UsersService],
})
export class ChatModule {}
