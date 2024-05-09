import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SCHEMAS } from 'src/utilities/constants';
import { MessageSchema } from './schema/message.schema';
import { ChatSchema } from '../chat/schema/chat.schema';

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
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
