import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { UserService } from './user.service';
import { USER_EVENT } from 'src/utilities/constants/constants.event';
import { LoginUserDto } from './dto/login-user.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  path: USER_EVENT.WS + USER_EVENT.PREFIX,
  cors: {
    origin: '*',
  },
})
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(USER_EVENT.ACTION.LOGIN)
  async login(
    @MessageBody() loginUserDto: LoginUserDto,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const response = await this.userService.login(loginUserDto);
      client.emit(USER_EVENT.ACTION.LOGIN, response);
    } catch (error) {
      console.log(error.message);
    }
  }
}
