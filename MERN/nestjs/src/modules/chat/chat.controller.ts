/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CHAT_CONSTANTS } from 'src/utilities/constants';
import { FindOrCreateChatDto } from './dto/findOrCreate-chat.dto';
import { FindChatDto } from './dto/find-chat.dto';
import { CreateGroupChatDto } from './dto/create-group-chat.dto';
import { RenameGroupChatDto } from './dto/renameGroup-chat.dto';
import { AddUsersGroupChatDto } from './dto/addUsersToGroup-chat.dto';
import { RemoveUsersFromGroupChatDto } from './dto/removeUsersFromGroup-chat.dto';
import { UpdateUsersInGroupDto } from './dto/updateUsersInGroup-chat.dto';
import { DeleteGroupChatDto } from './dto/deleteGroup-chat.dto';

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

  @Put(CHAT_CONSTANTS.ACTION.UPDATE_USERS_TO_GROUP)
  async updateUsersToGroupChat(
    @Body() updateUsersInGroupDto: UpdateUsersInGroupDto,
  ) {
    return await this.chatService.updateUsersToGroupChat(updateUsersInGroupDto);
  }

  @Delete(CHAT_CONSTANTS.ACTION.DELETE_GROUP_CHAT)
  async deleteGroupChat(@Query() deleteGroupChatDto: DeleteGroupChatDto) {
    return await this.chatService.deleteGroupChat(deleteGroupChatDto);
  }
}
