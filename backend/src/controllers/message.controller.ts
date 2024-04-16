import { StatusCodes } from 'http-status-codes';
import {
  createMessageService,
  getMessageService,
} from '../services/message.service';

export const createMessage = async (req: any, res: any) => {
  try {
    const { id, senderId, text } = req?.body;
    if (!id || !senderId || !text) {
      return res.json({
        message: 'Missing id or senderId or text',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    return res.json(await createMessageService({ id, senderId, text }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const getMessage = async (req: any, res: any) => {
  try {
    const { messageId } = req?.params;
    if (!messageId) {
      return res.json({
        message: 'Missing messageId',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    return res.json(await getMessageService(messageId));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};
