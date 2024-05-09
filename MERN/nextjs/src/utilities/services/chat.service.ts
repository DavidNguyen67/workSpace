import instance from '@/configs/axios.config';
import { CHAT_CONSTANTS } from '../constants';

export const findOrCreateChat = async (
  payload: FindOrCreateChat
): Promise<CommonResponse> => {
  return await instance.post(
    CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.FIND_OR_CREATE,
    payload
  );
};

export const findAllChatBySenderId = async (
  payload: FindChat
): Promise<CommonResponse> => {
  return await instance.get(
    `${CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.FIND}?senderId=${
      payload.senderId
    }`
  );
};

export const createGroupChat = async (
  payload: GroupChat
): Promise<CommonResponse> => {
  return await instance.post(
    CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.CREATE_GROUP_CHAT,
    payload
  );
};

export const updateUsersToGroupChat = async (
  payload: UpdateUsersInGroup
): Promise<CommonResponse> => {
  return await instance.put(
    CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.UPDATE_USERS_TO_GROUP,
    payload
  );
};

export const deleteGroupChat = async (
  payload: DeleteGroupChat
): Promise<CommonResponse> => {
  return await instance.delete(
    `${
      CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.DELETE_GROUP_CHAT
    }?chatId=${payload.chatId}`
  );
};
