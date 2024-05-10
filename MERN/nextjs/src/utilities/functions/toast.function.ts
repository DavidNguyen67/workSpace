import { HttpStatusCode } from 'axios';

/**
 * Hàm này xác định loại của toast dựa trên mã trạng thái HTTP.
 * @param {number} statusCode Mã trạng thái HTTP.
 * @returns {'error' | 'success' | 'warning'} Loại của toast.
 */
export const typeToast = (
  statusCode: number
): 'error' | 'success' | 'warning' => {
  switch (statusCode) {
    case HttpStatusCode.Ok:
    case HttpStatusCode.Created:
      return 'success';
    case HttpStatusCode.BadRequest:
    case HttpStatusCode.Unauthorized:
    case HttpStatusCode.NotFound:
      return 'error';
    case HttpStatusCode.Forbidden:
    case HttpStatusCode.UnprocessableEntity:
      return 'warning';
    default:
      return 'error';
  }
};
