export const PREFIX_API = 'api/v1';

export const USER_CONSTANTS = {
  PREFIX: '/user',
  ACTION: {
    HTTP: {
      SIGN_UP: '/signup',
      LOGIN: '/login',
      FIND_ALL: '/findAll',
      FIND: '/find',
    },
    WS: {
      JOIN_ROOM: '/joinRoom',
      CONNECTED: '/connected',
      DISCONNECTED: '/disconnected',
      TYPING: '/typing',
      STOP_TYPING: '/stopTyping',
    },
  },
};

export const CHAT_CONSTANTS = {
  PREFIX: '/chat',
  ACTION: {
    HTTP: {
      FIND_OR_CREATE: '/findOrCreate',
      FIND: '/find',
      CREATE_GROUP_CHAT: '/createGroupChat',
      RENAME_GROUP_CHAT: '/renameGroupChat',
      UPDATE_USERS_TO_GROUP: '/updateUsersToGroup',
      DELETE_GROUP_CHAT: '/deleteGroupChat',
    },
  },
};

export const MESSAGE_CONSTANTS = {
  PREFIX: '/message',
  ACTION: {
    HTTP: {
      CREATE: '/create',
      FIND_BY_CHAT_ID: '/findByChatId',
    },
  },
};
