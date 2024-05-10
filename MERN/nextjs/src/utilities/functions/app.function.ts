import _ from 'lodash';

/**
 * Hàm này nhận vào một mảng các người tham gia cuộc trò chuyện và id của người gửi, sau đó trả về người nhận.
 * @param {User[]} joiners Mảng các người tham gia cuộc trò chuyện.
 * @param {string} senderId Id của người gửi.
 * @returns {User | null} Người nhận hoặc null nếu không tìm thấy.
 */
export const getReceive = (joiners: User[], senderId: string): User | null => {
  // Tìm người nhận trong mảng các người tham gia cuộc trò chuyện
  const receiver = joiners.find((user) => user._id !== senderId);

  // Nếu không tìm thấy người nhận hoặc không có tên người nhận, trả về null
  if (!receiver || !receiver.username) {
    return null;
  }

  // Trả về người nhận đã tìm thấy
  return receiver;
};

/**
 * Hàm này so sánh hai mảng các đối tượng theo một thuộc tính cụ thể.
 * @param {string[]} array1 Mảng 1 chứa các giá trị của thuộc tính để so sánh.
 * @param {object[]} array2 Mảng 2 chứa các đối tượng để so sánh.
 * @param {string} property Thuộc tính để so sánh.
 * @returns {boolean} Kết quả so sánh: true nếu hai mảng giống nhau, false nếu không giống nhau.
 */
export const compareArrays = (
  array1: string[],
  array2: object[],
  property: string
) => {
  // Nếu độ dài của hai mảng không giống nhau, chắc chắn chúng không bằng nhau
  if (array1.length !== array2.length) {
    return false;
  }

  // Lặp qua các đối tượng trong mảng 1 và kiểm tra xem chúng có tồn tại trong mảng 2 không
  for (let obj1 of array1) {
    // Tìm kiếm đối tượng trong mảng 2 có thuộc tính property bằng với obj1
    const foundObj = array2.find((obj2: any) => obj2[property] === obj1);
    // Nếu không tìm thấy đối tượng tương tự trong mảng 2, mảng không bằng nhau
    if (!foundObj) {
      return false;
    }
  }

  // Nếu không tìm thấy khác biệt nào, mảng được xem là bằng nhau
  return true;
};
