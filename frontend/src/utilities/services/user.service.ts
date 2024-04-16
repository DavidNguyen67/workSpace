import { v4 } from 'uuid';
import instance from '../config/axios.config';
import { LOGIN, REGISTER, USER_PREFIX } from '../constants/constant-api';
import {
  SUCCESS_STATUS_CODE_MAX,
  SUCCESS_STATUS_CODE_MIN,
} from '../constants/constants-statusCode';
import toast from 'react-hot-toast';

export const registerUser = async (payload: User) => {
  try {
    const response: GlobalResponse = await instance.post(
      `${USER_PREFIX}${REGISTER}`,
      { ...payload, id: v4() }
    );
    const { data, statusCode, message } = response;

    if (
      statusCode >= SUCCESS_STATUS_CODE_MIN &&
      statusCode <= SUCCESS_STATUS_CODE_MAX
    ) {
      toast.success(message);
      return data;
    }
    toast.error(message);
    return null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const loginUser = async (payload: User) => {
  try {
    const response: GlobalResponse = await instance.post(
      `${USER_PREFIX}${LOGIN}`,
      payload
    );
    const { data, statusCode, message } = response;
    if (
      statusCode >= SUCCESS_STATUS_CODE_MIN &&
      statusCode <= SUCCESS_STATUS_CODE_MAX
    ) {
      toast.success(message);
      return data;
    }
    toast.error(message);
    return null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const getUsers = async (): Promise<any> => {
  try {
    const response: GlobalResponse = await instance.get(`${USER_PREFIX}`);
    const { data, statusCode, message } = response;
    if (
      statusCode >= SUCCESS_STATUS_CODE_MIN &&
      statusCode <= SUCCESS_STATUS_CODE_MAX
    ) {
      toast.success(message);
      return data;
    }
    toast.error(message);
    return null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
