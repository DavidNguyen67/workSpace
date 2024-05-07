type UserSignUpType = {
  username: string;
  email: string;
  password: string;
  avatar: File | null;
};

type UserSignInType = {
  email: string;
  password: string;
};

type UserFindAll = {
  limit: number;
  skip: number;
};

type UserFindByEmailOrUsername = {
  username?: string;
  email?: string;
};

type User = {
  _id: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  password: string;
  status: string;
  username: string;
};
