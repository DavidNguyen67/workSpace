import toast from 'react-hot-toast';
import instance from '../config/axios.config';
import {
  SUCCESS_STATUS_CODE_MAX,
  SUCCESS_STATUS_CODE_MIN,
} from '../constants/constants-statusCode';
import { ROOM_PREFIX } from '../constants/constant-api';

export const createRoom = async (payload: RoomPayload) => {
  try {
    const response: GlobalResponse = await instance.post(
      `${ROOM_PREFIX}`,
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

export const getRoom = async (recipientId: string): Promise<any> => {
  try {
    const response: GlobalResponse = await instance.get(
      `${ROOM_PREFIX}/${recipientId}`
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
