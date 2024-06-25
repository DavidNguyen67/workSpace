/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:53:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-25 09:53:29
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import axios from '@/config/axios.config';
import { AxiosRequestConfig } from 'axios';

export const keyOfPhoto = async (config?: AxiosRequestConfig<any>) => {
  return await axios.get('photo/keys', config);
};

export const getAllPhotos = async (
  config?: AxiosRequestConfig<any>
): Promise<Photo[]> => {
  return await axios.get('photo', config);
};

export const createAPhoto = async (
  payload: Photo,
  config?: AxiosRequestConfig<any>
) => {
  return await axios.post('photo', payload, config);
};

export const deleteAPhoto = async (
  id: string,
  config?: AxiosRequestConfig<any>
) => {
  return await axios.delete(`photo?id=${id}`, config);
};
