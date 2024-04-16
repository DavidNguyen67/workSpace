import { StatusCodes } from 'http-status-codes';
import {
  findUserService,
  findUsersService,
  loginUserService,
  registerUserService,
} from '../services/user.service';

export const registerUser = async (req: any, res: any) => {
  try {
    const { id, name, email, password } = req?.body;
    if (!id || !name || !email || !password) {
      return res.json({
        message: 'Missing id or name or email or password',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    return res.json(await registerUserService({ id, name, email, password }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password) {
      return res.json({
        message: 'Missing email or password',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    const response = await loginUserService({ email, password });

    if (response.data) {
      res.cookie('token', `Bearer ${response.data}`, {
        maxAge: 3 * 24 * 60 * 60 * 1000 /*3 days*/,
        httpOnly: true,
      });
    }
    return res.json(response);
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const findUser = async (req: any, res: any) => {
  try {
    const { id } = req?.params;
    if (!id) {
      return res.json({
        message: 'Missing id',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    return res.json(await findUserService({ id }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const findUsers = async (req: any, res: any) => {
  try {
    return res.json(await findUsersService());
  } catch (error: any) {
    console.log('Error', error.message);
  }
};
