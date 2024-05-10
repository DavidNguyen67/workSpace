import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/utilities/constants';
import { MessageSchema } from './schema/message.schema';
import { ChatSchema } from '../chat/schema/chat.schema';
import { MessageGateway } from './message.gateway';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: SCHEMAS.MESSAGE,
        schema: MessageSchema,
      },
      {
        name: SCHEMAS.CHAT,
        schema: ChatSchema,
      },
    ]),
    MessageModule,
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageGateway, ChatService],
})
export class MessageModule {}
