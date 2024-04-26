import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './schema/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/schema/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createChatDto: CreateChatDto): Promise<CommonResponse> {
    const chat = await this.chatModel
      .find({
        isGroupChat: false,
        $and: [
          {
            users: {
              $elemMatch: {
                $eq: createChatDto.userId,
              },
            },
          },
        ],
      })
      .populate('users', '-password')
      .populate('latestMessage');
    const users = await this.userModel.populate(chat, {
      path: 'latestMessage.sender',
      select: 'name avatar email',
    });

    if (users.length > 0) {
      console.log(users);
      return {
        message: 'This is your chat',
        statusCode: HttpStatus.OK,
        data: users[0],
      };
    } else {
      const newChat = new this.chatModel({
        name: 'sender',
        isGroupChat: false,
        users: [],
      });
    }
  }
}
