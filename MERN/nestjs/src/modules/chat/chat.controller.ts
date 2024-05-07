/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CHAT_CONSTANTS } from 'src/utilities/constants';
import { FindOrCreateChatDto } from './dto/findOrCreate-chat.dto';
import { FindChatDto } from './dto/find-chat.dto';
import { CreateGroupChatDto } from './dto/create-group-chat.dto';
import { RenameGroupChatDto } from './dto/renameGroup-chat.dto';
import { AddUsersGroupChatDto } from './dto/addUsersToGroup-chat.dto';

@Controller(CHAT_CONSTANTS.PREFIX)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get(CHAT_CONSTANTS.ACTION.FIND)
  async findAllBySenderId(@Query() findChatDto: FindChatDto) {
    return await this.chatService.findAllBySenderId(findChatDto);
  }

  @Post(CHAT_CONSTANTS.ACTION.FIND_OR_CREATE)
  async findOrCreate(@Body() findOrCreateChatDto: FindOrCreateChatDto) {
    return await this.chatService.findOrCreate(findOrCreateChatDto);
  }

  @Post(CHAT_CONSTANTS.ACTION.CREATE_GROUP_CHAT)
  async createGroupChat(@Body() createGroupChatDto: CreateGroupChatDto) {
    return await this.chatService.createGroupChat(createGroupChatDto);
  }

  @Put(CHAT_CONSTANTS.ACTION.RENAME_GROUP_CHAT)
  async renameGroupChat(@Body() renameGroupChatDto: RenameGroupChatDto) {
    return await this.chatService.renameGroupChat(renameGroupChatDto);
  }

  @Put(CHAT_CONSTANTS.ACTION.ADD_USERS_TO_GROUP)
  async addUsersToGroupChat(
    @Body() addUsersGroupChatDto: AddUsersGroupChatDto,
  ) {
    return await this.chatService.addUsersToGroupChat(addUsersGroupChatDto);
  }

  @Put(CHAT_CONSTANTS.ACTION.REMOVE_USERS_FROM_GROUP)
  async removeUsersFromGroupChat(
    @Body() addUsersGroupChatDto: AddUsersGroupChatDto,
  ) {
    return await this.chatService.removeUsersFromGroupChat(
      addUsersGroupChatDto,
    );
  }
}
