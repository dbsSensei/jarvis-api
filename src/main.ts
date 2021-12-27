import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const port: number = parseInt(`${process.env.PORT}`) || 3000;
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['secure-session'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(port);
}
bootstrap();
