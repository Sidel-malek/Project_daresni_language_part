import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3001);
}
bootstrap();
