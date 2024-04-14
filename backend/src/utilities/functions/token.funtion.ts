import jwt from 'jsonwebtoken';
import { env } from 'process';
import { TOKEN_EXP } from '../constants/token.constant';

const generateToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET || '', {
    expiresIn: TOKEN_EXP,
  });
};

const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, env.JWT_SECRET || '');
    return true;
  } catch (error: any) {
    // error
    console.log(error.message);
    return false;
  }
};

export { generateToken, verifyToken };
