/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-25 11:03:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-25 21:24:08
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

/**
 * Decorator được sử dụng để theo dõi khi kết nối HTTP bị đóng.
 *
 * @param {unknown} data Dữ liệu tùy chọn được truyền vào decorator.
 * @param {ExecutionContext} ctx Ngữ cảnh thực thi cung cấp thông tin về yêu cầu hiện tại.
 * @returns {Observable<void>} Một observable hoàn thành khi kết nối bị đóng.
 */
export const OnConnectionClosed = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    new Observable((observer) => {
      const request = ctx.switchToHttp().getRequest<Request>();

      request.on('close', () => observer.complete());
    }),
);
