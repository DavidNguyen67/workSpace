type UserSignUp = {
  id?: string;
  name: string;
  email: string;
  password: string;
  avatar: File | null;
};

type UserSignIn = {
  email: string;
  password: string;
};
