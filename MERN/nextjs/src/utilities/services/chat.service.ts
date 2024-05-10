import instance from '@/configs/axios.config';
import { CHAT_CONSTANTS } from '../constants';

/**
 * Hàm này được sử dụng để tìm hoặc tạo một cuộc trò chuyện mới.
 * @param {FindOrCreateChat} payload Dữ liệu đầu vào để tìm hoặc tạo cuộc trò chuyện.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc tìm hoặc tạo cuộc trò chuyện.
 */
export const findOrCreateChat = async (
  payload: FindOrCreateChat
): Promise<CommonResponse> => {
  return await instance.post(
    CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.HTTP.FIND_OR_CREATE,
    payload
  );
};

/**
 * Hàm này được sử dụng để tìm tất cả các cuộc trò chuyện mà một người dùng đã gửi tin nhắn.
 * @param {FindChat} payload Dữ liệu đầu vào để tìm cuộc trò chuyện.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc tìm cuộc trò chuyện.
 */
export const findAllChatBySenderId = async (
  payload: FindChat
): Promise<CommonResponse> => {
  return await instance.get(
    `${CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.HTTP.FIND}?senderId=${
      payload.senderId
    }`
  );
};

/**
 * Hàm này được sử dụng để tạo một cuộc trò chuyện nhóm mới.
 * @param {GroupChat} payload Dữ liệu đầu vào để tạo cuộc trò chuyện nhóm.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc tạo cuộc trò chuyện nhóm.
 */
export const createGroupChat = async (
  payload: GroupChat
): Promise<CommonResponse> => {
  return await instance.post(
    CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.HTTP.CREATE_GROUP_CHAT,
    payload
  );
};

/**
 * Hàm này được sử dụng để cập nhật người dùng trong một cuộc trò chuyện nhóm.
 * @param {UpdateUsersInGroup} payload Dữ liệu đầu vào để cập nhật người dùng trong cuộc trò chuyện nhóm.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc cập nhật người dùng trong cuộc trò chuyện nhóm.
 */
export const updateUsersToGroupChat = async (
  payload: UpdateUsersInGroup
): Promise<CommonResponse> => {
  return await instance.put(
    CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.HTTP.UPDATE_USERS_TO_GROUP,
    payload
  );
};

/**
 * Hàm này được sử dụng để xóa một cuộc trò chuyện nhóm.
 * @param {DeleteGroupChat} payload Dữ liệu đầu vào để xóa cuộc trò chuyện nhóm.
 * @returns {Promise<CommonResponse>} Một Promise chứa kết quả của việc xóa cuộc trò chuyện nhóm.
 */
export const deleteGroupChat = async (
  payload: DeleteGroupChat
): Promise<CommonResponse> => {
  return await instance.delete(
    `${
      CHAT_CONSTANTS.PREFIX + CHAT_CONSTANTS.ACTION.HTTP.DELETE_GROUP_CHAT
    }?chatId=${payload.chatId}`
  );
};
