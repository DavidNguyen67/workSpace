import { StatusCodes } from 'http-status-codes';
import {
  createRoomService,
  findUserRoomService,
  findUsersRoomService,
} from '../services/room.service';

export const createRoom = async (req: any, res: any) => {
  try {
    const { firstUserId, secondUserId } = req?.body;
    if (!firstUserId || !secondUserId) {
      return res.json({
        message: 'Missing firstUserId or secondUserId',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    return res.json(await createRoomService({ firstUserId, secondUserId }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const findUserRoom = async (req: any, res: any) => {
  try {
    const { userId } = req?.params;
    if (!userId) {
      return res.json({
        message: 'Missing userId',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }
    return res.json(await findUserRoomService(userId));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};

export const findUsersRoom = async (req: any, res: any) => {
  try {
    const { firstUserId, secondUserId } = req?.params;
    if (!firstUserId || !secondUserId) {
      return res.json({
        message: 'Missing firstUserId or secondUserId',
        statusCode: StatusCodes.BAD_REQUEST,
      });
    }

    return res.json(await findUsersRoomService({ firstUserId, secondUserId }));
  } catch (error: any) {
    console.log('Error', error.message);
  }
};
