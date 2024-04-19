import axios from '@/utilities/configs/axios.config';
import { USER_CONSTANTS } from '@/utilities/constants/constants.user';
import { UserLogin, UserRegister } from '@/utilities/interfaces/user.interface';

export const registerUser = (payload: UserRegister): any => {
  return axios.post(
    `${USER_CONSTANTS.PREFIX}${USER_CONSTANTS.ACTION.REGISTER}`,
    payload
  );
};

export const loginUser = (payload: UserLogin): any => {
  return axios.post(
    `${USER_CONSTANTS.PREFIX}${USER_CONSTANTS.ACTION.LOGIN}`,
    payload
  );
};
