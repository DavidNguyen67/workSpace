/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server } from 'http';
import {
  MESSAGE_CONSTANTS,
  SCHEMAS,
  USER_CONSTANTS,
} from 'src/utilities/constants';
import 'dotenv/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageSchema } from './schema/message.schema';
import { Socket } from 'socket.io';
import { JoinRoomChatDto } from '../chat/dto/joinRoom-chat.dto';
import { ChatService } from '../chat/chat.service';
import { TypingChatDto } from '../chat/dto/typing-chat.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
  path: MESSAGE_CONSTANTS.PREFIX,
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    @InjectModel(SCHEMAS.MESSAGE)
    private messageModel: Model<typeof MessageSchema>,
  ) {}

  handleConnection(client: Socket) {
    console.log(client.id, 'Connected');
  }

  handleDisconnect(client: Socket) {
    console.log(client.id, 'Disconnected');
  }

  @SubscribeMessage(USER_CONSTANTS.ACTION.WS.JOIN_ROOM)
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() joinRoomChatDto: JoinRoomChatDto,
  ) {
    client.join(joinRoomChatDto.chatId);
    client.emit(USER_CONSTANTS.ACTION.WS.CONNECTED);
  }

  @SubscribeMessage(USER_CONSTANTS.ACTION.WS.TYPING)
  onTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() typingChatDto: TypingChatDto,
  ) {
    client.in(typingChatDto.chatId).emit(USER_CONSTANTS.ACTION.WS.TYPING);
  }

  @SubscribeMessage(USER_CONSTANTS.ACTION.WS.STOP_TYPING)
  onStopTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() typingChatDto: TypingChatDto,
  ) {
    client.in(typingChatDto.chatId).emit(USER_CONSTANTS.ACTION.WS.STOP_TYPING);
  }

  @SubscribeMessage(USER_CONSTANTS.ACTION.WS.SEND_MESSAGE)
  async onSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    const chat: Chat | any = await this.chatService.findOneChatBy_Id(
      new Types.ObjectId(createMessageDto.chatId),
    );
    if (chat.users?.length > 0) {
      chat.users.forEach((item: User) => {
        client
          .in(createMessageDto.chatId)
          .emit(USER_CONSTANTS.ACTION.WS.RECEIVE_MESSAGE, createMessageDto);
      });
    }
  }
}
