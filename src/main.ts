import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import env from 'dotenv';

env.config();

async function bootstrap() {
   const app = await NestFactory.create(AppModule, { cors: true });
   app.enableCors();
   await app.listen(2271);
   console.log('Server runing!');
}
bootstrap();
