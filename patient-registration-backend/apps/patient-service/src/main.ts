import { NestFactory } from '@nestjs/core';
import { PatientModule } from './patient/patient.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(PatientModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  
  app.useStaticAssets(join(__dirname, '..', 'uploads'),{
    prefix: '/uploads/',
  });

  app.enableCors();
  await app.listen(3001,'0.0.0.0');
}
bootstrap();
