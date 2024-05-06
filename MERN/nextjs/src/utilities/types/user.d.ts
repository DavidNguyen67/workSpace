type UserSignUp = {
  id?: string;
  username: string;
  email: string;
  password: string;
  avatar: File | null;
};

type UserSignIn = {
  email: string;
  password: string;
};
