import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export function corsConfiguration(app: INestApplication) {
  const corsOptions: CorsOptions = {
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'X-Requested-With',
      'Authorization',
      'Accept',
      'Content-Type',
      'x-micro-key',
    ],
    optionsSuccessStatus: 204,
    preflightContinue: false,
  };

  app.enableCors(corsOptions);
}
