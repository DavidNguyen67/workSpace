/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { Schemas } from 'src/utilities/constants';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FindAllUserDto } from './dto/findAll-user.dto';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Schemas.Users) private userModel: Model<typeof UserSchema>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<CommonResponse> {
    try {
      const user = await this.userModel.findOne({
        email: { $regex: createUserDto.email, $options: 'i' },
      });
      if (user) {
        return {
          message: 'This email is already exist!',
          statusCode: HttpStatus.CONFLICT,
        };
      }
      const createdUser = new this.userModel({
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, saltRounds),
      });
      await createdUser.save();
      return {
        message: 'Create new user successfully',
        statusCode: HttpStatus.CREATED,
        data: await this.jwtService.signAsync((await createdUser.save()).id, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<CommonResponse> {
    try {
      const user: any = await this.userModel.findOne({
        email: {
          $regex: loginUserDto.email,
          $options: 'i',
        },
      });

      if (!user) {
        return {
          message: 'Your email or password is wrong',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }

      const match = await bcrypt.compare(loginUserDto.password, user.password);
      if (!match) {
        return {
          message: 'Your email or password is wrong',
          statusCode: HttpStatus.BAD_REQUEST,
        };
      }
      return {
        message: 'Login success fully',
        statusCode: HttpStatus.OK,
        data: await this.jwtService.signAsync(user.id, {
          secret: process.env.JWT_SECRET,
        }),
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async findAll(findAllUserDto: FindAllUserDto): Promise<CommonResponse> {
    try {
      const users = await this.userModel
        .find({})
        .sort({
          createAt: 'desc',
        })
        .skip(findAllUserDto.skip)
        .limit(findAllUserDto.limit);

      if (users.length < 1) {
        return {
          message: 'Users not found',
          statusCode: HttpStatus.NOT_FOUND,
        };
      }
      return {
        statusCode: HttpStatus.OK,
        data: users,
        message: 'Users found',
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
