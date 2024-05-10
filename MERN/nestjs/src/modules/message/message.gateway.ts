/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  ConnectedSocket,
  WsResponse,
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
import { Model } from 'mongoose';
import { MessageSchema } from './schema/message.schema';
import { Socket } from 'socket.io';
import { JoinRoomChatDto } from '../chat/dto/joinRoom-chat.dto';
import { ChatService } from '../chat/chat.service';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
  path: MESSAGE_CONSTANTS.PREFIX,
})
export class MessageGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messageService: MessageService,
    private readonly chatService: ChatService,
    @InjectModel(SCHEMAS.MESSAGE)
    private messageModel: Model<typeof MessageSchema>,
  ) {}

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {}

  @SubscribeMessage(MESSAGE_CONSTANTS.ACTION.HTTP.CREATE)
  create(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @SubscribeMessage(USER_CONSTANTS.ACTION.WS.JOIN_ROOM)
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() joinRoomChatDto: JoinRoomChatDto,
  ) {
    client.join(joinRoomChatDto.chatId);
    client.emit(USER_CONSTANTS.ACTION.WS.CONNECTED);
  }

  // @SubscribeMessage(USER_CONSTANTS.ACTION.WS.JOIN_ROOM)
  // joinRoom(
  //   @ConnectedSocket() client: Socket,
  //   @MessageBody() joinRoomChatDto: JoinRoomChatDto,
  // ) {
  //   client.join(joinRoomChatDto.chatId);
  //   client.emit(USER_CONSTANTS.ACTION.WS.CONNECTED);
  // }
}
