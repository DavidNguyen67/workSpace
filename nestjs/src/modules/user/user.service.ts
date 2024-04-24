import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';

export const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const isExistEmail = await this.findByEmail(createUserDto.email);
      if (isExistEmail) {
        return new ConflictException('Your email is exist').getResponse();
      }
      const createdUser = new this.userModel({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, saltRounds),
      });
      return {
        statusCode: HttpStatus.CREATED,
        data: await createdUser.save(),
        message: 'Your account is registered successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message).getResponse();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({
        email,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message).getResponse();
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.findByEmail(loginUserDto.email);
      if (!user) {
        return new NotFoundException(
          'Your email or password is wrong',
        ).getResponse();
      }

      const match = await bcrypt.compare(loginUserDto.password, user.password);

      if (!match) {
        return new BadRequestException(
          'Your email or password is wrong',
        ).getResponse();
      }

      return {
        statusCode: HttpStatus.OK,
        data: user,
        message: 'Login successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message).getResponse();
    }
  }
}
