import _ from 'lodash';

export const getReceive = (joiners: User[], senderId: string): User | null => {
  const sender = joiners.find((user) => user._id !== senderId);

  if (!sender || !sender.username) {
    return null;
  }

  return sender;
};

// Hàm so sánh hai mảng các đối tượng theo thuộc tính property
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
