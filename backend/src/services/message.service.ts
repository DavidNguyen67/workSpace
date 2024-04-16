import { StatusCodes } from 'http-status-codes';
import type { GlobalResponse } from '../utilities/types/global';
import type { Message } from '../utilities/types/message';
import MessageModel from '../models/message.model';

export const createMessageService = async (
  payload: Message
): Promise<GlobalResponse> => {
  try {
    const newMessage = new MessageModel({
      id: payload.id,
      senderId: payload.senderId,
      text: payload.text,
      roomId: payload.roomId,
    });

    await newMessage.save();
    return {
      message: 'New message was created',
      statusCode: StatusCodes.CREATED,
      data: newMessage,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }
};

export const getMessageService = async (
  roomId: string
): Promise<GlobalResponse> => {
  try {
    const messages = await MessageModel.find({ roomId });
    if (messages.length > 0)
      return {
        message: 'This is your messages',
        statusCode: StatusCodes.CREATED,
        data: messages,
      };

    return {
      message: "You didn't send any messages",
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
