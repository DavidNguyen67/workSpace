import { StatusCodes } from 'http-status-codes';
import {
  createMessageService,
  getMessageService,
} from '../services/message.service';

export const createMessage = async (req: any, res: any) => {
  try {
    const { id, senderId, text, roomId } = req?.body;
    if (!id || !senderId || !text || !roomId) {
      return res.json({
        message: 'Missing id or senderId or text or roomId',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    return res.json(await createMessageService({ id, senderId, text, roomId }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const getMessage = async (req: any, res: any) => {
  try {
    const { roomId } = req?.params;
    if (!roomId) {
      return res.json({
        message: 'Missing roomId',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    return res.json(await getMessageService(roomId));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};
