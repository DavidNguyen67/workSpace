import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MysqlModule } from '../database/mysql.module';
import { MongodbModule } from '../database/mongoose.module';

@Module({
  imports: [MysqlModule, MongodbModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
