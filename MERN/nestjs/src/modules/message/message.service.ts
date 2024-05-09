/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Model, Types } from 'mongoose';
import { MessageSchema } from './schema/message.schema';
import { SCHEMAS } from 'src/utilities/constants';
import { InjectModel } from '@nestjs/mongoose';
import { ChatSchema } from '../chat/schema/chat.schema';
import { FindByChatIdDto } from './dto/FindByChatId-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(SCHEMAS.MESSAGE)
    private messageModel: Model<typeof MessageSchema>,
    @InjectModel(SCHEMAS.CHAT)
    private chatModel: Model<typeof ChatSchema>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<CommonResponse> {
    try {
      const createdMessage = await this.messageModel.create({
        sender: createMessageDto.senderId,
        content: createMessageDto.content,
        chat: createMessageDto.chatId,
      });

      if (!createdMessage) {
        return {
          message: 'Create new message fail',
          statusCode: HttpStatus.AMBIGUOUS,
          data: createdMessage,
        };
      }
      await this.chatModel.findByIdAndUpdate(createMessageDto.chatId, {
        latestMessage: createdMessage._id,
      });
      const populatedMessage = await this.messageModel.populate(
        createdMessage,
        [
          { path: 'sender', select: '-password' }, // Populate sender từ UserModel
          {
            path: 'chat',
            populate: {
              path: 'users',
              select: '-password',
            },
          },
        ],
      );

      return {
        message: 'Create new message successfully',
        statusCode: HttpStatus.CREATED,
        data: populatedMessage,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findByChatId(
    findByChatIdDto: FindByChatIdDto,
  ): Promise<CommonResponse> {
    try {
      const messages = await this.messageModel
        .find({
          chat: new Types.ObjectId(findByChatIdDto.chatId),
        })
        .populate('sender', '-password')
        .populate({
          path: 'chat',
          populate: { path: 'users', select: '-password' },
        })
        .sort({ createAt: 'desc' });

      if (messages.length < 1) {
        return {
          message: 'Not found message',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      return {
        message: 'This is your message',
        statusCode: HttpStatus.OK,
        data: messages,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
