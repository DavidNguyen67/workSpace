import { Controller } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CHAT_CONSTANTS } from 'src/utilities/constants/constants.chat';

@Controller(CHAT_CONSTANTS.PREFIX)
export class UserController {
  constructor(private readonly chatService: ChatService) {}
}
