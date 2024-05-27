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
