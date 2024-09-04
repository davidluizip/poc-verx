import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { configuration } from './config/env.configuration';
import { swaggerConfiguration } from './config/swagger.configuration';
import { CultureSeederService } from './infrastructure/database/services/culture-seeder.service';
import { LoggerInterceptor } from './shared/interceptors/logging.interceptor';
import { PrismaExceptionInterceptor } from './shared/interceptors/prisma-exception.interceptor';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

const ENV = configuration().api;
const NODE_ENV = configuration().NODE_ENV;

(BigInt.prototype as any).toJSON = function (): string {
  return this.toString();
};

async function bootstrap() {
  const isProduction = process.env.NODE_ENV === 'prod';
  const logLevels: LogLevel[] = isProduction
    ? ['error', 'warn', 'log']
    : ['error', 'warn', 'log', 'debug', 'verbose'];

  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });

  const cultureSeederService = app.get(CultureSeederService);
  await cultureSeederService.seedCultures();

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalInterceptors(new PrismaExceptionInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix('api', { exclude: ['healthcheck'] });

  app.enableShutdownHooks();

  app.use(compression());

  swaggerConfiguration(app, '1.0', ENV.host, NODE_ENV);

  await app.listen(ENV.port || 3000);
  Logger.log(`Built for environment ${NODE_ENV}`, 'Main');
  Logger.log(`Server Host at ${ENV.host}`, 'Main');
}
bootstrap();
