import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { PREFIX_API } from './utilities/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: process.env.CLIENT_URL,
  });
  app.setGlobalPrefix(PREFIX_API);
  await app.listen(env.SERVER_PORT);
}

bootstrap();
