type UserSignUpType = {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar: File | null;
};

type UserSignInType = {
  email: string;
  password: string;
};
