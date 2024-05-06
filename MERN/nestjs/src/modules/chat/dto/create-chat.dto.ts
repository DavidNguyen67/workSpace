import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  chatName: string;

  @IsOptional()
  @IsBoolean()
  isGroupChat: boolean;

  //   Thuộc tính này dùng để kiểm tra coi user đã có đoạn chat chưa?
  //   nếu có thì trả lại ko cần tạo nữa
  @IsString()
  userId: string;
}
