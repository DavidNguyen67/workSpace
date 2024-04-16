import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import { saltRounds } from '../utilities/constants';
import { generateToken } from '../utilities/functions/token.funtion';
import type { User, UserFindById, UserLogin } from '../utilities/types/user';
import type { GlobalResponse } from '../utilities/types/global';
import { v4 } from 'uuid';

export const registerUserService = async (
  payload: User
): Promise<GlobalResponse> => {
  try {
    const user = await UserModel.findOne({ email: payload.email });

    if (!!user) {
      return {
        statusCode: StatusCodes.CONFLICT,
        message: 'Email is exist',
        data: null,
      };
    }
    if (!validator.isEmail(payload.email)) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Invalid Email',
      };
    }

    const newUser = new UserModel({
      ...payload,
      password: await bcrypt.hash(payload.password, saltRounds),
    });

    const token = generateToken(newUser.id);

    await newUser.save();

    return {
      statusCode: StatusCodes.CREATED,
      message: 'Success to register',
      data: token,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const loginUserService = async (
  payload: UserLogin
): Promise<GlobalResponse> => {
  try {
    const user = await UserModel.findOne({ email: payload.email });
    if (!user) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User is not exist',
        data: null,
      };
    }
    const match = await bcrypt.compare(payload.password, user.password || '');
    if (!match) {
      return {
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Wrong password or email',
        data: null,
      };
    }

    const token = generateToken(user.id);
    return {
      statusCode: StatusCodes.OK,
      message: 'Login success',
      data: token,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const findUserService = async (
  payload: UserFindById
): Promise<GlobalResponse> => {
  try {
    const user = await UserModel.findById({ id: payload.id });

    if (!user) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'User is not exist',
        data: null,
      };
    }
    return {
      statusCode: StatusCodes.OK,
      message: 'User is found',
      data: user,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const findUsersService = async (): Promise<GlobalResponse> => {
  try {
    const users = await UserModel.find({});

    if (users.length < 1) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Users is not exist',
        data: null,
      };
    }
    return {
      statusCode: StatusCodes.OK,
      message: 'Users is found',
      data: users,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
