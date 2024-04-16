import { StatusCodes } from 'http-status-codes';
import { verifyToken } from '../utilities/functions/token.funtion';

export const cookieJwtAuth = (req: any, res: any, next: any) => {
  try {
    if (!verifyToken(req)) {
      return res.json({
        message: 'Invalid Token',
        statusCode: StatusCodes.UNAUTHORIZED,
      });
    }
    next();
  } catch (error: any) {
    res.clearCookie && res.clearCookie('token');
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
