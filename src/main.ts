import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = app.get(ConfigService).get<number>('config.port');

  //validacion
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  console.log(`Corriendo en el puerto: ${port}`);
}
bootstrap();
