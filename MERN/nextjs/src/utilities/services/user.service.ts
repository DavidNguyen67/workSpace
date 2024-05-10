import instance from '@/configs/axios.config';
import { USER_CONSTANTS } from '../constants/user.constants';
import axios, { HttpStatusCode } from 'axios';

export const signUp = async (
  payload: UserSignUpType
): Promise<CommonResponse> => {
  try {
    if (!payload.avatar) {
      // TH không tạo tk kèm avatar
      return await instance.post(
        USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.HTTP.SIGN_UP,
        payload
      );
    }

    const data = new FormData();
    data.append('file', payload.avatar || '');
    data.append('upload_preset', 'chat-app');
    data.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');

    const uploadImagePromise = new Promise<{
      url: string;
      public_id: string;
      signature: string;
    }>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(
        'POST',
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        true
      );
      xhr.onload = () => {
        const imageResponse: CloudinaryImageResponse = JSON.parse(
          xhr.responseText
        );
        console.log(imageResponse);

        if (xhr.status === HttpStatusCode.Ok && imageResponse.url) {
          resolve({
            url: imageResponse.url,
            public_id: imageResponse.public_id,
            signature: imageResponse.signature,
          });
        } else {
          reject('Fail to upload avatar');
        }
      };
      xhr.onerror = () => reject('Fail to upload avatar');
      xhr.send(data);
    });

    const signUpPromise = instance.post(
      USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.HTTP.SIGN_UP,
      { ...payload, avatar: (await uploadImagePromise).url }
    );

    const [imageResult, signUpResult]: [any, any] = await Promise.allSettled([
      uploadImagePromise,
      signUpPromise,
    ]);
    if (
      imageResult.status === 'rejected' ||
      signUpResult.value?.statusCode !== HttpStatusCode.Created
    ) {
      return await axios
        .post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/destroy`,
          {
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            public_id: imageResult.value?.public_id,
            signature: imageResult.value?.signature,
            timestamp: Math.floor(Date.now() / 1000),
          }
        )
        .then(() => ({
          message: 'Fail to sign up',
          statusCode: HttpStatusCode.BadRequest,
        }))
        .catch((error: any) => ({
          message: error.message,
          statusCode: HttpStatusCode.InternalServerError,
        }));
    } else {
      return {
        message: 'Sign up successfully',
        statusCode: HttpStatusCode.Ok,
      };
    }
  } catch (error: any) {
    return {
      message: error.message,
      statusCode: HttpStatusCode.InternalServerError,
    };
  }
};

export const login = async (
  payload: UserSignInType
): Promise<CommonResponse> => {
  return await instance.post(
    USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.HTTP.LOGIN,
    payload
  );
};

export const findAll = async (
  payload: UserFindAll
): Promise<CommonResponse> => {
  return await instance.get(
    `${USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.HTTP.FIND_ALL}?skip=${
      payload.skip
    }&limit=${payload.limit}`
  );
};

export const findByEmailOrUserName = async (
  payload: UserFindByEmailOrUsername
): Promise<CommonResponse> => {
  if (payload.email) {
    return await instance.get(
      `${USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.HTTP.FIND}?email=${
        payload.email
      }`
    );
  }
  if (payload.username) {
    return await instance.get(
      `${USER_CONSTANTS.PREFIX + USER_CONSTANTS.ACTION.HTTP.FIND}?username=${
        payload.username
      }`
    );
  }
  return {
    message: 'Missing query param',
    statusCode: HttpStatusCode.BadRequest,
  };
};
