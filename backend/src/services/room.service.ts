import { StatusCodes } from 'http-status-codes';
import RoomModel from '../models/room.model';
import type { GlobalResponse } from '../utilities/types/global';
import type { Room } from '../utilities/types/room';

export const createRoomService = async (
  payload: Room
): Promise<GlobalResponse> => {
  try {
    const room = await RoomModel.findOne({
      members: {
        $all: [payload.firstUserId, payload.secondUserId],
      },
    });
    if (room) {
      return {
        message: 'This is your room',
        statusCode: StatusCodes.OK,
        data: room,
      };
    }

    const newRoom = new RoomModel({
      id: payload.id,
      members: [payload.firstUserId, payload.secondUserId],
    });
    await newRoom.save();
    return {
      message: 'New room was created',
      statusCode: StatusCodes.CREATED,
      data: newRoom,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const findUserRoomService = async (
  userId: string
): Promise<GlobalResponse> => {
  try {
    const room = await RoomModel.find({
      members: { $in: [userId] },
    });
    if (room.length > 0) {
      return {
        message: 'This is your room',
        statusCode: StatusCodes.OK,
        data: room,
      };
    }

    return {
      message: "You didn't join any room",
      statusCode: StatusCodes.NOT_FOUND,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const findUsersRoomService = async (
  payload: Room
): Promise<GlobalResponse> => {
  try {
    const room = await RoomModel.find({
      members: { $all: [payload.firstUserId, payload.secondUserId] },
    });
    if (room.length > 0) {
      return {
        message: 'This is your room',
        statusCode: StatusCodes.OK,
        data: room,
      };
    }

    return {
      message: "You didn't join any room",
      statusCode: StatusCodes.NOT_FOUND,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};
