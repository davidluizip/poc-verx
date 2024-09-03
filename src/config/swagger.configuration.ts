import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function swaggerConfiguration(
  app: INestApplication,
  version: string,
  host: string,
  stage: string,
) {
  const dest =
    stage === 'prod'
      ? 'Production'
      : stage === 'stg'
        ? 'Staging'
        : 'Developement';

  const swaggerDocumentBuilder = new DocumentBuilder()
    .setTitle('API POC VERX')
    .setDescription('API POC VERX')
    .setVersion(version)
    .addServer(`${host}`, dest)
    .setContact('', '', '')
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentBuilder,
    swaggerDocumentOptions,
  );

  SwaggerModule.setup('swagger', app, swaggerDocument);
}
