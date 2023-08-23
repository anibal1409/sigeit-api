import * as cookieParser from 'cookie-parser';

import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('SIGEIT-API')
    .setDescription('The SIGEIT-APIdescription')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const globalPrefix = 'api';

  const port = process.env.PORT || 3333;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT, 10) || 3000);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}
bootstrap();
