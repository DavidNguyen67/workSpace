// Hàm để cắt chuỗi và hiển thị chỉ 2 dòng
export const truncateDescription = (
  description: string,
  maxLength: number = 30
) => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength).trim() + '...'; // Cắt chuỗi và thêm dấu "..."
  }
  return description;
};
