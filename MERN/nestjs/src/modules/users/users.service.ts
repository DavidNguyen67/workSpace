/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { SCHEMAS } from 'src/utilities/constants';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FindAllUserDto } from './dto/findAll-user.dto';
import { FindByEmailOrUserNameUserDto } from './dto/findByEmailOrUserName-user-dto';
import * as _ from 'lodash';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(SCHEMAS.USERS) private userModel: Model<typeof UserSchema>,
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
        // Loại bỏ những trường có giá trị false bằng lodash trước khi insert vào db
        ..._.omitBy(createUserDto, _.isNil),
        password: await bcrypt.hash(createUserDto.password, saltRounds),
      });

      return {
        message: 'Create new user successfully',
        statusCode: HttpStatus.CREATED,
        data: await this.jwtService.signAsync(
          (await createdUser.save())._id.toString(),
          {
            secret: process.env.JWT_SECRET,
          },
        ),
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
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
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAll(findAllUserDto: FindAllUserDto): Promise<CommonResponse> {
    try {
      const users = await this.userModel
        .find({})
        .sort({
          createAt: 'desc',
        })
        .select('-password -_id -__v')
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
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async find(
    findByEmailOrUserNameUserDto: FindByEmailOrUserNameUserDto,
  ): Promise<CommonResponse> {
    try {
      function buildSearchConditions(dto: any) {
        const conditions = [];

        if (dto.email) {
          conditions.push({
            email: {
              $regex: dto.email,
              $options: 'i',
            },
          });
        }

        if (dto.username) {
          conditions.push({
            username: {
              $regex: dto.username,
              $options: 'i',
            },
          });
        }

        return conditions.length > 0 ? conditions : [{}];
      }

      const regex = buildSearchConditions(findByEmailOrUserNameUserDto);

      const users = await this.userModel
        .find({
          $or: regex,
        })
        .sort({
          createAt: 'desc',
        });

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
      return {
        message: error.message,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findById(userId: string): Promise<CommonResponse> {
    try {
      const user = await this.userModel.findById(userId).select('-password');

      if (user) {
        return {
          message: 'User  found',
          statusCode: HttpStatus.OK,
          data: user,
        };
      }
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
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
