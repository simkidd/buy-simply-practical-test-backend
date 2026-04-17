import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './utils/config';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';

const prodOrigins = ['https://'];
const devOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const env = config.NODE_ENV;

let origin: string[] | boolean;

if (env === 'production') {
  origin = prodOrigins;
} else if (env === 'development') {
  origin = [...prodOrigins, ...devOrigins];
} else {
  origin = true;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin,
    credentials: true,
  });

  app.use(express.json());

  app.setGlobalPrefix(config.API_PATH);
  app.useGlobalPipes(new ValidationPipe({ enableDebugMessages: true }));

  await app.listen(config.PORT, () =>
    console.log(`Server listening on ${config.PORT}`),
  );
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
