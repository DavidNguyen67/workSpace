/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-15 23:59:11
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:25:48
 * @ Description:
 */

import { Module } from '@nestjs/common';
import { mysqlProviders } from '../../providers/mysql.providers';

@Module({
  providers: [...mysqlProviders],
  exports: [...mysqlProviders],
})
export class MysqlModule {}
