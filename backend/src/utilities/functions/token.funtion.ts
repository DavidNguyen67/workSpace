import jwt from 'jsonwebtoken';
import { env } from 'process';
import { TOKEN_EXP } from '../constants/token.constant';

export const generateToken = (id: string) => {
  return jwt.sign({ id }, env.JWT_SECRET || '', {
    expiresIn: TOKEN_EXP,
  });
};

export const verifyToken = (req: any): boolean => {
  try {
    jwt.verify(fromHeaderOrQueryString(req), env.JWT_SECRET || '');
    return true;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};

const fromHeaderOrQueryString = (req: any) => {
  const { token } = req.cookies;
  if (token && token.split(' ')[0] === 'Bearer') return token.split(' ')[1];
  else if (req.query && req.query.token) return req.query.token;
  if (token) return token;
  return null;
};
