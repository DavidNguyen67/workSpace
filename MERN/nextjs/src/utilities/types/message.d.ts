type Message = {
  sender: User;
  content: string;
  chat: Chat;
  createAt?: string;
  updateAt?: string;
};

type CreateMessage = {
  senderId: string;
  content: string;
  chatId: string;
};

type GetMessages = {
  chatId: string;
};

type MessageSentResponse = {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
  createAt: string;
  updateAt: string;
};
