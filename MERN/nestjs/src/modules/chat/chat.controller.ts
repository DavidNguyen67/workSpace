/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CHAT_CONSTANTS } from 'src/utilities/constants';
import { FindOrCreateChatDto } from './dto/findOrCreate-chat.dto';

@Controller(CHAT_CONSTANTS.PREFIX)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // @Get(CHAT_CONSTANTS.ACTION.FIND)
  // async findOne(@Query() findChatDto: FindChatDto) {
  //   return await this.chatService.findOne(findChatDto);
  // }

  @Post(CHAT_CONSTANTS.ACTION.CREATE)
  async findOrCreate(@Body() findOrCreateChatDto: FindOrCreateChatDto) {
    return this.chatService.findOrCreate(findOrCreateChatDto);
  }
}
