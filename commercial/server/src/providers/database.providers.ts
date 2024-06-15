import { Sequelize } from 'sequelize-typescript';
import 'dotenv/config';
import { Cat } from 'src/entities/cat.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.NEST_PRIVATE_DATABASE_HOST,
        port: +process.env.NEST_PRIVATE_DATABASE_PORT,
        username: process.env.NEST_PRIVATE_DATABASE_USERNAME,
        password: process.env.NEST_PRIVATE_DATABASE_PASSWORD,
        database: process.env.NEST_PRIVATE_DATABASE,
      });
      sequelize.addModels([Cat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
