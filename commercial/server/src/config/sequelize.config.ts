/**
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 16:34:08
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 17:54:08
 * @ Description:
 */

import { SequelizeOptions } from 'sequelize-typescript';
import 'dotenv/config';

const sequelizeConfig: SequelizeOptions = {
  dialect: 'mysql',
  host: process.env.NEST_PRIVATE_MYSQL_AWS_DATABASE_HOST,
  port: +process.env.NEST_PRIVATE_MYSQL_AWS_DATABASE_PORT,
  username: process.env.NEST_PRIVATE_MYSQL_AWS_DATABASE_USERNAME,
  password: process.env.NEST_PRIVATE_MYSQL_AWS_DATABASE_PASSWORD,
  database: process.env.NEST_PRIVATE_MYSQL_AWS_DATABASE,
};

export default sequelizeConfig;
