import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UserService } from './user.service';
import { USER_EVENT } from 'src/utilities/constants/constants.action';
import { LoginUserDto } from './dto/login-user.dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
export class UserGateway {
  constructor(private readonly userService: UserService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage(USER_EVENT.ACTION.LOGIN)
  login(@MessageBody() loginUserDto: LoginUserDto) {
    console.log(this.userService.login(loginUserDto));
  }
}
