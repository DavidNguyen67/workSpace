import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { SCHEMAS } from 'src/utilities/constants';
import { ChatSchema } from './schema/chat.schema';
import { CreateGroupChatDto } from './dto/create-group-chat.dto';
import { faker } from '@faker-js/faker';
import { FindOrCreateChatDto } from './dto/findOrCreate-chat.dto';
import { FindChatDto } from './dto/find-chat.dto';
import { RenameGroupChatDto } from './dto/renameGroup-chat.dto';
import { AddUsersGroupChatDto } from './dto/addUsersToGroup-chat.dto';
import { UpdateUsersInGroupDto } from './dto/updateUsersInGroup-chat.dto';
import { DeleteGroupChatDto } from './dto/deleteGroup-chat.dto';
import { JoinRoomChatDto } from './dto/joinRoom-chat.dto';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(SCHEMAS.CHAT) private chatModel: Model<typeof ChatSchema>,
  ) {}

  async createGroupChat(
    createGroupChatDto: CreateGroupChatDto,
  ): Promise<CommonResponse> {
    try {
      const groupChat = new this.chatModel({
        chatName: createGroupChatDto.chatName,
        users: createGroupChatDto.receiveIds,
        groupAdminId: createGroupChatDto.senderId,
        isGroupChat: true,
      });
      const createdGroupChat = await groupChat.save();

      if (createdGroupChat) {
        return {
          message: 'Create new chat successfully',
          data: await this.findOneChatBy_Id(createdGroupChat._id),
          statusCode: HttpStatus.CREATED,
        };
      }

      return {
        message: 'Create new chat unsuccessfully',
        statusCode: HttpStatus.AMBIGUOUS,
      };
    } catch (error) {
      console.log(error.message);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAllBySenderId(findChatDto: FindChatDto): Promise<CommonResponse> {
    try {
      const chats = await this.chatModel
        .find({
          $or: [
            {
              users: {
                $in: [new Types.ObjectId(findChatDto.senderId)],
              },
            },
            {
              groupAdminId: new Types.ObjectId(findChatDto.senderId),
            },
          ],
        })
        .sort({ updatedAt: -1 })
        .populate('users', '-password -__v')
        .populate('latestMessage', '-__v')
        .select('-__v');

      if (chats.length > 0) {
        return {
          message: 'This is your chats',
          data: chats,
          statusCode: HttpStatus.OK,
        };
      }

      return {
        message: `You don't have any chat`,
        statusCode: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOrCreate(
    findOrCreateChatDto: FindOrCreateChatDto,
  ): Promise<CommonResponse> {
    try {
      // Kiểm tra có đoạn chat nào là 1 - 1 giữa 2 người thông qua _id không
      const chat = await this.chatModel
        .findOne({
          $and: [
            { isGroupChat: false },
            {
              users: {
                $all: [
                  new Types.ObjectId(findOrCreateChatDto.senderId),
                  new Types.ObjectId(findOrCreateChatDto.receiveId),
                ],
              },
            },
          ],
        })
        .populate('users', '-password -__v')
        .populate('latestMessage', '-__v')
        .select('-__v');

      // Vì dùng find để lấy các trường liên kết với nhau, và đoạn chat ở đây chủ đích sẽ trả về 1 array có 1 phần tử
      // => lập tử trả về array[0]

      if (chat) {
        // Nếu có đoạn chat thoã mãn return
        return {
          message: 'This is your chat',
          data: chat,
          statusCode: HttpStatus.OK,
        };
      }

      const createdChat = await this.chatModel.create({
        chatName: faker.vehicle.vehicle(),
        isGroupChat: false,
        users: [
          new Types.ObjectId(findOrCreateChatDto.receiveId),
          new Types.ObjectId(findOrCreateChatDto.senderId),
        ],
      });

      return {
        message: 'We created a new chat for you',
        data: await this.findOneChatBy_Id(createdChat._id),
        statusCode: HttpStatus.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async renameGroupChat(
    renameGroupChatDto: RenameGroupChatDto,
  ): Promise<CommonResponse> {
    try {
      const updatedChat = await this.chatModel.findByIdAndUpdate(
        renameGroupChatDto.chatId,
        {
          chatName: renameGroupChatDto.newNameGroupChat,
        },
        { new: true }, // Return the updated document
      );
      if (updatedChat) {
        return {
          message: 'Rename successfully',
          data: updatedChat,
          statusCode: HttpStatus.OK,
        };
      }

      return {
        message: 'Rename failed',
        statusCode: HttpStatus.AMBIGUOUS,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async addUsersToGroupChat(
    addUsersGroupChatDto: AddUsersGroupChatDto,
  ): Promise<CommonResponse> {
    try {
      const updatedChat = await this.chatModel.findByIdAndUpdate(
        new Types.ObjectId(addUsersGroupChatDto.chatId),
        { $pullAll: { users: addUsersGroupChatDto.receiveIds } },
        { new: true }, // Return the updated document
      );

      if (updatedChat) {
        return {
          message: 'Add users successfully',
          data: await this.findOneChatBy_Id(updatedChat._id),
          statusCode: HttpStatus.OK,
        };
      }

      return {
        message: 'Add users failed',
        statusCode: HttpStatus.AMBIGUOUS,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async removeUsersFromGroupChat(
    addUsersGroupChatDto: AddUsersGroupChatDto,
  ): Promise<CommonResponse> {
    try {
      const chatId = new Types.ObjectId(addUsersGroupChatDto.chatId);
      const receiveIds = addUsersGroupChatDto.receiveIds.map(
        (item) => new Types.ObjectId(item),
      );

      const updatedChat = await this.chatModel.findByIdAndUpdate(
        chatId,
        {
          $pull: {
            users: { $in: receiveIds },
          },
        },
        { new: true }, // Return the updated document
      );

      if (updatedChat) {
        return {
          message: 'Remove users successfully',
          data: await this.findOneChatBy_Id(updatedChat._id), // Return the updated chat
          statusCode: HttpStatus.OK,
        };
      }

      return {
        message: 'Remove users failed',
        statusCode: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async updateUsersToGroupChat(
    updateUsersInGroupDto: UpdateUsersInGroupDto,
  ): Promise<CommonResponse> {
    try {
      const updatedChat = await this.chatModel.findByIdAndUpdate(
        new Types.ObjectId(updateUsersInGroupDto.chatId),
        {
          users: updateUsersInGroupDto.receiveIds,
          chatName: updateUsersInGroupDto.chatName,
        },
        { new: true }, // Return the updated document
      );

      if (updatedChat) {
        return {
          message: 'Update group successfully',
          data: await this.findOneChatBy_Id(updatedChat._id), // Return the updated chat
          statusCode: HttpStatus.OK,
        };
      }

      return {
        message: 'Update group failed',
        statusCode: HttpStatus.NOT_FOUND,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async deleteGroupChat(
    deleteGroupChatDto: DeleteGroupChatDto,
  ): Promise<CommonResponse> {
    try {
      const chat = await this.chatModel
        .findOneAndDelete({
          _id: new Types.ObjectId(deleteGroupChatDto.chatId),
        })
        .exec();

      if (!chat) {
        return {
          message: 'Delete fail',
          statusCode: HttpStatus.AMBIGUOUS,
        };
      }
      return {
        message: 'Delete successfully',
        statusCode: HttpStatus.OK,
        data: chat,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOneChatBy_Id(_id: Types.ObjectId) {
    try {
      return await this.chatModel
        .findOne({
          _id: new Types.ObjectId(_id),
        })
        .populate('users', '-password -__v')
        .populate('latestMessage', '-__v')
        .select('-__v');
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Socket join room
  async joinRoom(joinRoomChatDto: JoinRoomChatDto) {
    try {
      console.log(joinRoomChatDto);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
