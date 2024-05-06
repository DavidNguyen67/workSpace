import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CHAT_CONSTANTS } from 'src/utilities/constants';

@Controller(CHAT_CONSTANTS.PREFIX)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
}
