import { HttpStatusCode } from 'axios';

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
