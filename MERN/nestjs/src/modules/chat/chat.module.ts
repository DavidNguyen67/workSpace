import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/utilities/constants';
import { ChatSchema } from './schema/chat.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.CHAT,
        schema: ChatSchema,
      },
    ]),
    JwtModule,
  ],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
