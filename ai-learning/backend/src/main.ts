import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS 有効化（PoC用）
  app.enableCors({
    origin: true, // 本番では具体的なドメインを指定
    credentials: true
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`AI API server running on port ${port}`);
}
bootstrap();