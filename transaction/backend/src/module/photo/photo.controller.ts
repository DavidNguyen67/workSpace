/**
 * @Author         : David Nguyễn <davidnguyen67dev@gmail.com>
 * @CreatedDate    : 2024-06-25 14:51:00
 * @LastEditors    : David Nguyễn <davidnguyen67dev@gmail.com>
 * @LastEditDate   : 2024-06-25 21:38:28
 * @CopyRight      : Con chù chù 🥴🥴
 **/

import {
  Body,
  Controller,
  Delete,
  Get,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { OnConnectionClosed } from 'src/decorator/OnConnectionClosed.decorator';
import { Observable } from 'rxjs';
import sleep from 'src/utility/function/sleep.function';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  /**
   * Tạo một photo mới.
   * @param createPhotoDto - Dữ liệu của photo mới sẽ được tạo.
   * @returns Kết quả của việc tạo photo.
   */
  @Post()
  async createOne(@Body() createPhotoDto: CreatePhotoDto) {
    return await this.photoService.createOne(createPhotoDto);
  }

  /**
   * Lấy danh sách tất cả các photo.
   * @returns Danh sách tất cả các photo.
   */
  @Get()
  async findAll() {
    return await this.photoService.findAll();
  }

  /**
   * Xóa một photo theo ID. Nếu kết nối bị huỷ khi hoàn tất xóa, sẽ thực hiện rollback.
   * @param deletePhotoDto - ID của photo cần xóa.
   * @param onClosed - Observable để theo dõi sự kiện kết nối bị đóng.
   * @returns Thông báo "Oke" nếu việc xóa hoàn tất mà không bị gián đoạn.
   */
  @Delete()
  async deleteOne(
    @Query('id', ParseUUIDPipe) deletePhotoDto: string,
    @OnConnectionClosed() onClosed: Observable<void>,
  ) {
    // Đăng ký lắng nghe sự kiện user huỷ connect
    // Khi user huỷ connect ( huỷ yêu cầu ) thì sẽ đi vào hàm này
    onClosed.subscribe({
      complete: async () => {
        console.log('Request is canceled by user');
        return await this.photoService.rollback();
      },
    });

    await this.photoService.delete(deletePhotoDto);

    await sleep(5000);

    return 'Oke';
  }
}
