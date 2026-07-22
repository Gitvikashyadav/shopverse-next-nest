import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformResponseInterceptor } from './common/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation for all incoming DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // strips properties not in DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  app.enableCors();

  app.setGlobalPrefix('api/v1'); // routes become /api/v1/auth/signup etc.

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}/api/v1`);
}
bootstrap();