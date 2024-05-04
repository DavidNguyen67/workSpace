import { IsNumberString, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumberString()
  user_id: string;

  @IsString()
  device_type: string;

  @IsString()
  notification_token: string;
}
