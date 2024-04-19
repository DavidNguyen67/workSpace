export interface IUser {
  id: string;
  name: string;
  email: string;
}
export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserRegister extends IUserLogin {
  id: string;
  name: string;
  passwordConfirm: string;
}
