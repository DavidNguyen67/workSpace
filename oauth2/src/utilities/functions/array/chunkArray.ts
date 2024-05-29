import _ from 'lodash';

/**
 * Chia mảng thành các nhóm có kích thước cố định.
 *
 * @template T Kiểu của các phần tử trong mảng.
 * @param {T[]} array - Mảng cần chia nhóm.
 * @param {number} size - Kích thước của mỗi nhóm.
 * @returns {T[][]} Mảng chứa các nhóm phần tử.
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  return _.chunk(array, size);
};

/**
 * Lấy một số lượng phần tử cụ thể từ mảng sử dụng thư viện lodash.
 *
 * @param array Mảng nguồn chứa các phần tử.
 * @param count Số lượng phần tử cần lấy.
 * @returns Một mảng chứa số lượng phần tử cụ thể được lấy ra.
 */
export const takeItems = <T>(array: T[], count: number): T[] => {
  return _.take(array, count);
};
