import { Sequelize } from 'sequelize-typescript';
import sequelizeConfig from '@/config/sequelize.config';
import { Cat } from '@/entities/mysql';
import { SEQUELIZE } from '@/utilities/constants';

/**
 * Cung cấp Sequelize cho NestJS với nhiều mô hình.
 *
 * @ Author: David Nguyễn
 * @ Email: davidnguyen67dev@gmail.com
 * @ Create Time: 2024-06-16 18:15:00
 * @ Modified by: David Nguyễn
 * @ Modified time: 2024-06-16 18:20:00
 * @ Description: Cấu hình và đăng ký các mô hình với Sequelize
 *
 * - Kết nối đến cơ sở dữ liệu MySQL.
 * - Đăng ký các mô hình  với Sequelize.
 * - Đồng bộ hóa các mô hình với cơ sở dữ liệu.
 *
 * @returns {Promise<Sequelize>} Kết nối Sequelize
 */

export const mysqlProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize(sequelizeConfig);
      sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
