import {
  findUserService,
  findUsersService,
  loginUserService,
  registerUserService,
} from '../services/user.service';

const registerUser = async (req: any, res: any) => {
  try {
    const { id, name, email, password } = req?.body;
    return res.json(await registerUserService({ id, name, email, password }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

const loginUser = async (req: any, res: any) => {
  try {
    const { email, password } = req?.body;
    return res.json(await loginUserService({ email, password }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

const findUser = async (req: any, res: any) => {
  try {
    const { id } = req?.params;
    return res.json(await findUserService({ id }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

const findUsers = async (req: any, res: any) => {
  try {
    return res.json(await findUsersService());
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export { registerUser, loginUser, findUser, findUsers };
