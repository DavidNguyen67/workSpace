import instance from '@/configs/axios.config';
import { USER_CONSTANTS } from '../constants/constants.user';

export const signUp = async (payload: UserSignUp): Promise<CommonResponse> => {
  return await instance.post(
    USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.SIGN_UP,
    payload
  );
};

export const login = async (payload: UserSignIn): Promise<CommonResponse> => {
  return await instance.post(
    USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.LOGIN,
    payload
  );
};
