import * as cookieParser from 'cookie-parser';

// eslint-disable-next-line prettier/prettier
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
    .addCookieAuth()
    .setBasePath('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // await OpenApiNestFactory.configure(
  //   app,
  //   new DocumentBuilder()
  //     .setTitle('SIGEIT-API')
  //     .setDescription('The SIGEIT-API description')
  //     .addBearerAuth(),
  //   {
  //     webServerOptions: {
  //       enabled: true,
  //       path: 'api-docs',
  //     },
  //     fileGeneratorOptions: {
  //       enabled: true,
  //       outputFilePath: './openapi.yaml',
  //     },
  //     clientGeneratorOptions: {
  //       enabled: true,
  //       type: 'typescript-axios',
  //       outputFolderPath: '../typescript-api-client/src',
  //       additionalProperties:
  //         'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
  //       openApiFilePath: './openapi.yaml',
  //       skipValidation: true,
  //     },
  //   },
  //   {
  //     operationIdFactory: (c: string, method: string) => method,
  //   },
  // );
  const globalPrefix = 'api';

  const port = process.env.PORT || 3333;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(parseInt(process.env.PORT, 10) || 3000);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}
bootstrap();
