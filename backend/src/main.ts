import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Static Web Apps からのアクセスを許可
  app.enableCors({ 
    origin: [
      'https://blue-glacier-0a5c1d900.3.azurestaticapps.net', // Static Web Apps URL
      'http://localhost:3000', // 開発時用
      '*' // PoC用：本番では削除
    ],
    credentials: true
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();