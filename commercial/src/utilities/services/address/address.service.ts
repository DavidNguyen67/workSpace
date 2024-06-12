import rawProvinces from '@/json/address/nested-divisions.json';

export const fetchProvince = async (): Promise<any> => {
  return rawProvinces;
};
