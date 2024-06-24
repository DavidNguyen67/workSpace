/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-24 20:53:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-24 23:05:49
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import axios from '@/config/axios.config';

export const keyOfPhoto = async () => {
  return await axios.get('photo/keys');
};

export const getAllPhotos = async (): Promise<Photo[]> => {
  return await axios.get('photo');
};

export const createAPhoto = async (payload: Photo) => {
  return await axios.post('photo', payload);
};

export const deleteAPhoto = async (id: string) => {
  return await axios.delete(`photo?id=${id}`);
};
