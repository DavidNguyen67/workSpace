import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { Schemas } from 'src/utilities/constants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Schemas.Users,
        schema: UserSchema,
      },
    ]),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
