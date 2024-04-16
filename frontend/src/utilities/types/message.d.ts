type Message = {
  id: string;
  senderId: string;
  text: string;
  roomId: string;
};

type MessageResponse = {
  createdAt: string;
  updateAt: string;
  roomId: string;
  senderId: string;
  text: string;
  id: string;
};
