import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getEnvFilePath } from 'src/shared/utils/env.utils';
import { configuration, validate } from './env.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: getEnvFilePath(),
      load: [configuration],
      isGlobal: true,
    }),
  ],
  exports: [],
})
export class ConfigurationsModule {}
