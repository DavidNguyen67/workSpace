import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { MESSAGE_CONSTANTS } from 'src/utilities/constants';
import { FindByChatIdDto } from './dto/FindByChatId-message.dto';

@Controller(MESSAGE_CONSTANTS.PREFIX)
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post(MESSAGE_CONSTANTS.ACTION.CREATE)
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get(MESSAGE_CONSTANTS.ACTION.FIND_BY_CHAT_ID)
  findByChatId(@Query() findByChatIdDto: FindByChatIdDto) {
    return this.messageService.findByChatId(findByChatIdDto);
  }
}
