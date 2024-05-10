import instance from '@/configs/axios.config';
import { MESSAGE_CONSTANTS } from '../constants';

/**
 * Hàm này được sử dụng để gửi một tin nhắn mới.
 * @param {CreateMessage} payload Dữ liệu đầu vào để tạo tin nhắn mới.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc gửi tin nhắn.
 */
export const sendMessage = async (
  payload: CreateMessage
): Promise<CommonResponse> => {
  return instance.post(
    MESSAGE_CONSTANTS.PREFIX + MESSAGE_CONSTANTS.ACTION.HTTP.CREATE,
    payload
  );
};

/**
 * Hàm này được sử dụng để lấy tất cả các tin nhắn trong một cuộc trò chuyện.
 * @param {GetMessages} payload Dữ liệu đầu vào để lấy tin nhắn.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc lấy tin nhắn.
 */
export const getMessages = async (
  payload: GetMessages
): Promise<CommonResponse> => {
  return instance.get(
    `${
      MESSAGE_CONSTANTS.PREFIX + MESSAGE_CONSTANTS.ACTION.HTTP.FIND_BY_CHAT_ID
    }?chatId=${payload.chatId}`
  );
};
