import instance from '@/configs/axios.config';
import { MESSAGE_CONSTANTS } from '../constants';

export const sendMessage = async (
  payload: CreateMessage
): Promise<CommonResponse> => {
  return instance.post(
    MESSAGE_CONSTANTS.PREFIX + MESSAGE_CONSTANTS.ACTION.CREATE,
    payload
  );
};

export const getMessages = async (
  payload: GetMessages
): Promise<CommonResponse> => {
  return instance.get(
    `${
      MESSAGE_CONSTANTS.PREFIX + MESSAGE_CONSTANTS.ACTION.FIND_BY_CHAT_ID
    }?chatId=${payload.chatId}`
  );
};
