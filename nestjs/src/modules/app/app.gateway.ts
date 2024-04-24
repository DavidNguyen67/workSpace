import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { AppService } from './app.service';

@WebSocketGateway({
  cors: {
    origin: `*`,
  },
})
export class AppGateway {
  constructor(private readonly appService: AppService) {}

  @SubscribeMessage('createMessage')
  create(@MessageBody() body: any) {
    console.log(body);
  }
}
