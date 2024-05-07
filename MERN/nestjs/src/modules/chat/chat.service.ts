/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { SCHEMAS } from 'src/utilities/constants';
import { ChatSchema } from './schema/chat.schema';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { UsersService } from '../users/users.service';
import { faker } from '@faker-js/faker';
import { FindOrCreateChatDto } from './dto/findOrCreate-chat.dto';
import { UserSchema } from '../users/schema/user.schema';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(SCHEMAS.CHAT) private chatModel: Model<typeof ChatSchema>,
    @InjectModel(SCHEMAS.USERS) private userModel: Model<typeof UserSchema>,
    private readonly userService: UsersService,
  ) {}

  create(createChatDto: CreateChatDto) {
    return 'This action adds a new chat';
  }

  findAll() {
    return `This action returns all chat`;
  }

  async findOrCreate(
    findOrCreateChatDto: FindOrCreateChatDto,
  ): Promise<CommonResponse> {
    try {
      // Kiểm tra có đoạn chat nào là 1 - 1 giữa 2 người thông qua _id không
      const chat = await this.chatModel
        .find({
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

      // Vì dùng populate để lấy các trường liên kết với nhau, và đoạn chat ở đây chủ đích sẽ trả về 1 array có 1 phần tử
      // => lập tử trả về array[0]

      if (chat.length > 0) {
        // Nếu có đoạn chat thoã mãn return
        return {
          message: 'This is your chat',
          data: chat[0],
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
        data: (
          await this.chatModel
            .find({
              _id: new Types.ObjectId(createdChat._id),
            })
            .populate('users', '-password -__v')
            .populate('latestMessage', '-__v')
            .select('-__v')
        )[0],
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

  update(updateChatDto: UpdateChatDto) {}

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
