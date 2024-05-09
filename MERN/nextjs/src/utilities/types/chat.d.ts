type FindOrCreateChat = {
  isGroupChat?: boolean;
  senderId: string;
  receiveId: string;
};

type Chat = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  groupAdminId: string;
  latestMessage?: Message;
  createdAt: string;
  updatedAt: string;
};

type FindChat = {
  senderId: string;
};

type GroupChat = {
  chatName: string;
  senderId: string;
  receiveIds: string[];
};

type UpdateUsersInGroup = {
  chatId: string;
  receiveIds: string[];
  chatName: string;
};

type DeleteGroupChat = {
  chatId: string;
};
