import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

export const saltRounds = 10;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CommonResponse> {
    try {
      const isExistEmail = await this.findByEmail(createUserDto.email);
      if (isExistEmail) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: 'Your email is already exist',
        };
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

  async login(loginUserDto: LoginUserDto): Promise<CommonResponse> {
    try {
      const user = await this.findByEmail(loginUserDto.email);
      if (!user) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Your email or password is not exist',
        };
      }

      const match = await bcrypt.compare(loginUserDto.password, user.password);

      if (!match) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Your email or password is wrong',
        };
      }

      return {
        statusCode: HttpStatus.OK,
        access_token: await this.jwtService.signAsync({ id: user.id }),
        message: 'Login successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message).getResponse();
    }
  }
}
