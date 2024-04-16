type RoomPayload = {
  id: string;
  firstUserId: string;
  secondUserId: string;
};

type RoomResponse = {
  createdAt?: string;
  updateAt?: string;
  members: string[];
  _id: string;
  id: string;
};
