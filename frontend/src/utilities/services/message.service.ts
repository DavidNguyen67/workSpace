import toast from 'react-hot-toast';
import instance from '../config/axios.config';
import {
  SUCCESS_STATUS_CODE_MAX,
  SUCCESS_STATUS_CODE_MIN,
} from '../constants/constants-statusCode';
import { MESSAGE_PREFIX } from '../constants/constant-api';

export const getMessages = async (messageId: string) => {
  try {
    const response: GlobalResponse = await instance.get(
      `${MESSAGE_PREFIX}/${messageId}`
    );
    const { data, statusCode } = response;
    if (
      statusCode >= SUCCESS_STATUS_CODE_MIN &&
      statusCode <= SUCCESS_STATUS_CODE_MAX
    ) {
      return data;
    }
    return null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

export const sendMessage = async (payload: Message) => {
  try {
    const response: GlobalResponse = await instance.post(
      `${MESSAGE_PREFIX}`,
      payload
    );
    const { data, statusCode, message } = response;
    if (
      statusCode >= SUCCESS_STATUS_CODE_MIN &&
      statusCode <= SUCCESS_STATUS_CODE_MAX
    ) {
      return data;
    }
    toast.error(message);
    return null;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};
